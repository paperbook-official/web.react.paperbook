import { OrderStatus } from '../../enums/order';

export class UpdateOrderPayload {
    status: OrderStatus;
    trackingCode: string;
}
