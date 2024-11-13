import { Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  test(): string {
    return 'Is it working the nest.js';
  }

  maths(): number {
    return 398 * 4932 + 23 - ((679312 / 1) % 67);
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

  login(inputusername: string, inputuserpassword: string): boolean {
    const username = 'yogesh';
    const password = '123456';

    return username === inputusername && password === inputuserpassword;
  }

  date() {
    const currentDate = new Date();
    const presntDate = currentDate.toLocaleString();
    return {
      message: 'Current server date and time',
      presntDate,
    };
  }

  pickacolor(colorNum: string): string {
    if (colorNum === '1') {
      return 'Green';
    } else if (colorNum === '2') {
      return 'Pink';
    } else if (colorNum === '3') {
      return 'Red';
    } else if (colorNum === '4') {
      return 'Navy Blue';
    } else if (colorNum === '5') {
      return 'Safforn';
    } else if (colorNum === '6') {
      return 'White';
    } else {
      return null;
    }
  }

 
}
