import {OrderDetailsDto} from './order-details-dto';

export interface OrderResponse {
    content: OrderDetailsDto[],
    totalElements:number;
}
