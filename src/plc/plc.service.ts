import { Injectable, Logger } from '@nestjs/common';
import {
  AdsClientConnection,
  AdsState,
  AdsTcSystemState,
  AmsRouterState,
  Client,
} from 'ads-client';
import { PlcConfig } from './plc.config';
import {
  Pallet,
  Enum4,
  Enum1,
  Enum3,
  Enum2,
  SystemErrors,
  PlcVariable,
} from './types';
import { PlcServiceInterface } from './plc.interface';
import * as ms from 'ms';

@Injectable()
export class PlcService implements PlcServiceInterface {
  private readonly logger = new Logger(PlcService.name);
  private readonly client: Client;

  private cache: Record<PlcVariable, any> = {
    [PlcVariable.Var18]: Array(80).fill({
      Prop1: Enum1.Val1,
      Prop2: Enum4.Val1,
      Prop5: Enum3.Val5,
      Prop4: Enum2.Val1,
      Prop3: 'Pallet Disabled',
    } satisfies Pallet),

    [PlcVariable.Var19]: Array(85)
      .fill(0)
      .map((_, index) => index),

    [PlcVariable.Var31]: Array<boolean>(SystemErrors.length).fill(false),
    [PlcVariable.Var01]: false,
    [PlcVariable.Var02]: false,
    [PlcVariable.Var03]: false,
    [PlcVariable.Var04]: false,
    [PlcVariable.Var05]: false,
    [PlcVariable.Var07]: false,
    [PlcVariable.Var06]: false,
    [PlcVariable.Var08]: false,
    [PlcVariable.Var09]: false,
    [PlcVariable.Var10]: false,

    [PlcVariable.Var39]: '',
    [PlcVariable.Var40]: '',
    [PlcVariable.Var41]: '',
    [PlcVariable.Var42]: '',
    [PlcVariable.Var43]: '',
    [PlcVariable.Var44]: '',
    [PlcVariable.Var45]: '',
    [PlcVariable.Var46]: false,

    [PlcVariable.Var11]: false,
    [PlcVariable.Var12]: false,
    [PlcVariable.Var13]: false,
    [PlcVariable.Var14]: false,
    [PlcVariable.Var15]: false,
    [PlcVariable.Var16]: false,
    [PlcVariable.Var17]: false,

    [PlcVariable.Var20]: false,

    [PlcVariable.Var21]: false,
    [PlcVariable.Var22]: false,
    [PlcVariable.Var23]: false,
    [PlcVariable.Var24]: false,
    [PlcVariable.Var25]: false,
    [PlcVariable.Var26]: false,
    [PlcVariable.Var27]: true,
    [PlcVariable.Var28]: false,
    [PlcVariable.Var29]: false,
    [PlcVariable.Var30]: false,

    [PlcVariable.Var34]: false,
    [PlcVariable.Var32]: 0,
    [PlcVariable.Var33]: 0,
    [PlcVariable.Var35]: false,
    [PlcVariable.Var36]: false,

    [PlcVariable.Var37]: { AuthKey: '', cmd: '', RequestingBayNumber: 0 },
    [PlcVariable.Var38]: {
      AuthKey: '',
      VinNumber: '',
      RequestingBayNumber: 0,
    },
  };

  constructor(private readonly config: PlcConfig) {
    this.client = new Client({
      targetAmsNetId: `${config.host}.1.1`,
      targetAdsPort: 851,

      // TODO: AdsListener uses a 15s interval to check the connection status, should we make this longer?
      connectionCheckInterval: ms('1s'),

      // Timeout delay and Down Delay should not be too high for the connection loss detection to work correctly.
      // Otherwise subscriptions are not recreated after the connection is restored.
      timeoutDelay: ms('2s'),
      connectionDownDelay: ms('5s'),
      autoReconnect: true,
      reconnectInterval: ms('1s'),
    });

    // Enable detailed debugging logs
    // this.client.setDebugLevel(2);
  }

  onConnect = (connection: AdsClientConnection) => {
    this.logger.log(
      `Connected to the PLC at ${connection.targetAmsNetId}:${connection.targetAdsPort}; IsLocal? ${connection.isLocal ? 'Yes' : 'No'}`,
    );
  };

  onDisconnect = (connectionLost: boolean) => {
    this.logger.warn(
      'Disconnected from the PLC. Was this a connection loss? ' +
        (connectionLost ? 'Yes' : 'No'),
    );
  };

  onReconnect = async (
    allSubscriptionsRestored: boolean,
    unrestoredSubscriptions: string[],
  ) => {
    if (allSubscriptionsRestored) {
      this.logger.log('All subscriptions have been restored');
    } else {
      this.logger.error(
        `Failed to restore ${unrestoredSubscriptions.length} subscriptions. Re-creating the connection.`,
      );

      // TODO: consider crashing the process and letting the orchestrator restart the service
      await this.stop();
      await this.start();
    }
  };

  onConnectionLost = (socketFailure: boolean) => {
    this.logger.warn(
      `Lost connection to the PLC. Was this a socket failure? ${socketFailure ? 'Yes' : 'No'}`,
    );
  };

  onPlcSymbolVersionChange = (version: number, previousVersion?: number) => {
    this.logger.warn(
      `PLC symbol version changed from ${previousVersion} to ${version}`,
    );
  };

  onPlcRuntimeStateChange = (state: AdsState, previousState?: AdsState) => {
    this.logger.warn(
      `PLC runtime state changed. AdsState=${previousState?.adsState}>${state.adsState}; DeviceState=${previousState?.deviceState}>${state.deviceState}`,
    );
  };

  onTwincatSystemStateChange = (
    state: AdsTcSystemState,
    previousState?: AdsTcSystemState,
  ) => {
    this.logger.warn(
      `Twincat system state changed. Version=${previousState?.version}>${state.version}; Restart Index=${previousState?.restartIndex}>${state.restartIndex}; AdsState=${previousState?.adsState}>${state.adsState}; DeviceState=${previousState?.deviceState}>${state.deviceState}`,
    );
  };

  onRouterStateChange = (
    state: AmsRouterState,
    previousState?: AmsRouterState,
  ) => {
    this.logger.warn(
      `ADS Router state changed to ${state.state} from ${previousState?.state}`,
    );
  };

  onWarning = (warning: string) => {
    this.logger.warn(warning);
  };

  async start(): Promise<void> {
    this.logger.log('Starting the PLC service');

    try {
      await this.client.connect();
    } catch (err: unknown) {
      this.logger.warn({ err }, 'Failed to start the PLC service');

      // Rethrow and let the service crash since ads-client won't try to reconnect a connection that could not be established
      throw err;
    }

    // Register event listeners
    this.client.on('connect', this.onConnect);
    this.client.on('disconnect', this.onDisconnect);
    this.client.on('reconnect', this.onReconnect);
    this.client.on('connectionLost', this.onConnectionLost);
    this.client.on('plcSymbolVersionChange', this.onPlcSymbolVersionChange);
    this.client.on('plcRuntimeStateChange', this.onPlcRuntimeStateChange);
    this.client.on('tcSystemStateChange', this.onTwincatSystemStateChange);
    this.client.on('routerStateChange', this.onRouterStateChange);
    this.client.on('warning', this.onWarning);

    await this.setupSubscriptions();
  }

  async stop(): Promise<void> {
    this.logger.log('Stopping the PLC service');

    // Remove event listeners
    this.client.off('connect', this.onConnect);
    this.client.off('disconnect', this.onDisconnect);
    this.client.off('reconnect', this.onReconnect);
    this.client.off('connectionLost', this.onConnectionLost);
    this.client.off('plcSymbolVersionChange', this.onPlcSymbolVersionChange);
    this.client.off('plcRuntimeStateChange', this.onPlcRuntimeStateChange);
    this.client.off('tcSystemStateChange', this.onTwincatSystemStateChange);
    this.client.off('routerStateChange', this.onRouterStateChange);
    this.client.off('warning', this.onWarning);

    try {
      // This will also remove all subscriptions

      await this.client.disconnect(false);
    } catch (err: unknown) {
      this.logger.warn({ err }, 'Failed to stop the PLC service');
    }
  }

  async read<T = any>(variableName: PlcVariable): Promise<T | null> {
    this.logger.debug(`Reading PLC variable "${variableName}"`);

    const cachedValue = this.cache[variableName] as T;

    if (typeof cachedValue !== 'undefined') {
      return cachedValue as T;
    }

    return null;
  }

  async write<T = any>(variableName: PlcVariable, value: T): Promise<T | null> {
    this.logger.log({ value }, `Writing PLC variable "${variableName}"`);

    try {
      const result = await this.client.writeValue(variableName, value);
      this.logger.debug(
        { result },
        `Persisted PLC variable value for "${variableName}"`,
      );
      return result.value;
    } catch (err: unknown) {
      this.logger.error({ err }, 'Failed to write PLC variable value');
    }

    return null;
  }

  isConnected(): boolean {
    // Some of our subscriptions keep dying and not being restored, so we need to check the number of active subscriptions
    // against the expected number of subscriptions to determine if the connection is healthy.
    const connectionKeys = Object.keys(this.client.activeSubscriptions);
    const activeSubscriptions = Object.keys(
      this.client.activeSubscriptions[connectionKeys[0]],
    ).length;

    // We add 2 because ads-client creates 2 internal subscriptions for the symbol versions and device data
    const expectedActiveSubscriptions = Object.keys(this.cache).length + 2;

    const areAllSubscriptionsActive =
      activeSubscriptions === expectedActiveSubscriptions;

    if (!areAllSubscriptionsActive) {
      this.logger.warn(
        `Expected ${expectedActiveSubscriptions} active subscriptions, but found ${activeSubscriptions}.`,
      );
    }

    return this.client.connection.connected && areAllSubscriptionsActive;
  }

  private async setupSubscriptions() {
    const allKeys = Object.keys(this.cache);

    for (const key of allKeys) {
      try {
        // Add a subscription to receive all changes for the PLC variable
        // When subscribing to a variable, the callback is called with the initial value
        await this.client.subscribeValue(
          key,
          /* Update the in-memory cache */
          (data) => {
            this.cache[key] = data.value;
          },
          /* How often the PLC checks for value changes, defaults to 200ms */
          ms('100ms'),
          /* Only receive updates when values change */
          true,
        );
      } catch (err: unknown) {
        this.logger.error({ err }, `Failed to read PLC variable "${key}"`);

        // Rethrow and let the service crash since ads-client won't try to recreate the subscription and the variable may be missing
        throw err;
      }
    }
  }
}
