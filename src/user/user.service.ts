import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor() {}

  getHello(): string {
    return 'Hello World!';
  }

  multi(): any {
    return {
      message: `Hello Mark, regarding the financial matter, the total amount I owe you is Rs. 450,000. Out of this, Rs. 270,000 will be transferred on the 3rd of June.`,
      breakdown: {
        percentage_of_next_payment: `${((270000 / 450000) * 100).toFixed(2)}%`,
        interest_on_capital: `Rs. ${(450000 * 0.05).toFixed(2)} at 5% interest rate`,
        dividend_on_investment: `Rs. ${(450000 * 0.08).toFixed(2)} at 8% dividend yield`,
        loss_on_investment: `Rs. 50,000`,
        net_capital_after_loss: `Rs. ${450000 - 50000}`,
      },
      total_payable: `Rs. 450,000`,
      balance_due: `Rs. 270,000 to be cleared by next month`,
    };
  }
}
