import { OrderStatus } from '../../enums/order';

export interface UpdateOrderPayload {
    status?: OrderStatus;
}
