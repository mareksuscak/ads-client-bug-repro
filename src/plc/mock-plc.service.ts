/* eslint-disable array-element-newline */

import { Injectable, Logger } from '@nestjs/common';
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

@Injectable()
export class MockPlcService implements PlcServiceInterface {
  private readonly logger = new Logger(MockPlcService.name);

  private mockData: Record<PlcVariable, any> = {
    [PlcVariable.Var18]: [
      // Floor 1
      {
        Prop1: Enum1.Val1,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '2002074531',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      // Floor 2
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      // Floor 3
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '2002294295',
      },
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '2002401360',
      },
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '2002462068',
      },
      // Floor 4
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '2002541941',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '2002558158',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      // Floor 5
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      // Floor 6
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '2002585832',
      },
      // Floor 7
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '2002593020',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      // Floor 8
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      // Floor 9
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      // Floor 10
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.LongCar,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: 'CA1669144',
      },
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val1,
        Prop3: '20026170177', // intentionally wrong stock number to simulate verification error
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      // Floor 11
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
      // Or an occupied pallet
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val2,
        Prop4: Enum2.Val2,
        Prop3: 'CA1520977',
      },
      {
        Prop1: Enum1.Val2,
        Prop2: Enum4.Val2,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val3,
        Prop3: '2002665335',
      },
      {
        Prop1: Enum1.Val3,
        Prop2: Enum4.Val1,
        Prop5: Enum3.Val5,
        Prop4: Enum2.Val1,
        Prop3: '',
      },
    ] satisfies Pallet[],

    [PlcVariable.Var19]: [
      255, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
      38, 39, 40, 41, 42, 43, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255,
      255, 0, 0,
    ],

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

    [PlcVariable.Var11]: true, // Required to be operational
    [PlcVariable.Var12]: true, // Required to be operational
    [PlcVariable.Var13]: false, // VMS team sets that
    [PlcVariable.Var14]: true,
    [PlcVariable.Var15]: true,
    [PlcVariable.Var16]: false,
    [PlcVariable.Var17]: false,

    [PlcVariable.Var20]: true, // Required to be operational

    [PlcVariable.Var21]: true, // Required to be operational if Status_ADS_IsInBP is false
    [PlcVariable.Var22]: false, // Required to be operational if Status_Tower_IsInBP is false
    [PlcVariable.Var23]: false,
    [PlcVariable.Var24]: false, // If the tower's moving at all, this is true
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
    [PlcVariable.Var38]: { AuthKey: '', VinNumber: '', RequestingBayNumber: 0 },
  };

  constructor(private readonly config: PlcConfig) {
    // Uncomment to simulate errors
    // this.mockData[PlcVariable.Status_Tower_Errors][1] = true;

    if ((this.mockData[PlcVariable.Var31] as Array<boolean>).some(Boolean)) {
      this.mockData[PlcVariable.Var25] = true;
    }

    if (
      !this.mockData[PlcVariable.Var14] &&
      !this.mockData[PlcVariable.Var15]
    ) {
      this.mockData[PlcVariable.Var27] = false;
    }
  }

  async start(): Promise<void> {
    this.logger.log('Starting the PLC service');
  }

  async stop(): Promise<void> {
    this.logger.log('Stopping the PLC service');
  }

  async read<T = any>(variableName: PlcVariable): Promise<T | null> {
    this.logger.debug(`Reading PLC variable "${variableName}"`);
    const value = this.mockData[variableName] as T | undefined;
    if (value === undefined) {
      return null;
    }
    return value;
  }

  async write<T = any>(variableName: PlcVariable, value: T): Promise<T | null> {
    this.logger.debug({ value }, `Writing PLC variable "${variableName}"`);
    this.mockData[variableName] = value;
    return value;
  }

  isConnected(): boolean {
    return true;
  }
}
