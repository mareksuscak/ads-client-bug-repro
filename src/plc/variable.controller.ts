import { Controller, Get } from '@nestjs/common';
import { PlcVariable, PlcVariableDescriptions } from './types';
import { PlcServiceInterface } from './plc.interface';
import { InjectPlcService } from './inject-plc-svc.decorator';

@Controller('variables')
// @UseGuards(AuthGuard) // TODO: uncomment this line before prod push
export class VariableController {
  constructor(
    @InjectPlcService() private readonly plcService: PlcServiceInterface,
  ) {}

  @Get()
  async list() {
    const keys = Object.values<PlcVariable>(PlcVariable);
    const vars: Array<any> = [];
    for (const key of keys) {
      const value = await this.plcService.read(key);
      vars.push({ key, value, description: PlcVariableDescriptions[key] });
    }
    return vars;
  }
}
