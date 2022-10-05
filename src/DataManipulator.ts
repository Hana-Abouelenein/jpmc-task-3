import { ServerRespond } from './DataStreamer';

export interface Row {
  // updating row attributes to match the new graph attributes
  price_abc: number,
  price_def: number,
  ratio: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
      const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
      const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
      const ratio = priceABC / priceDEF;
      const upperBound = 1 + 0.05;
      const lowerBound = 1 - 0.05;

      return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
          //using a switch statement to define timestamp
        timestamp: serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[1].timestamp : serverResponds[0].timestamp,
        upper_bound: upperBound,
        lower_bound: lowerBound,
          // using a switch statement to define trigger_alert
        trigger_alert: (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
      };
  }
}
