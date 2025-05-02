import { Inject } from '@nestjs/common';

export const PLC_SVC_TOKEN = 'PLC_SERVICE';

/**
 * Injects Bull's queue instance with the given name
 * @param name queue name
 */
export const InjectPlcService = (): ParameterDecorator => Inject(PLC_SVC_TOKEN);
