import {
  ClassProvider,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { PlcService } from './plc.service';
import { PlcConfig } from './plc.config';
import { VariableController } from './variable.controller';
import { PlcServiceInterface } from './plc.interface';
import { MockPlcService } from './mock-plc.service';
import { InjectPlcService, PLC_SVC_TOKEN } from './inject-plc-svc.decorator';

const plcServiceProvider: ClassProvider<PlcServiceInterface> = {
  provide: PLC_SVC_TOKEN,
  useClass:
    process.env.USE_MOCK_PLC_SVC === 'true' ? MockPlcService : PlcService,
};

@Module({
  imports: [],
  providers: [PlcConfig, plcServiceProvider],
  exports: [PlcConfig, plcServiceProvider],
  controllers: [VariableController],
})
export class PlcModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  constructor(
    @InjectPlcService() private readonly plcService: PlcServiceInterface,
  ) {}

  async onApplicationBootstrap() {
    await this.plcService.start();
  }

  async onApplicationShutdown(signal?: string) {
    // Print using console.log because the logger may have been shut down already
    console.log(`WARN: Received shutdown signal ${signal}`);
    await this.plcService.stop();
  }
}
