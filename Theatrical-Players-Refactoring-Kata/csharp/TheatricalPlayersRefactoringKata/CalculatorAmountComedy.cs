using System;
using System.Collections.Generic;
using System.Text;

namespace TheatricalPlayersRefactoringKata
{
    public class CalculatorAmountComedy : ICalculatorAmount
    {
        private readonly string _playType;

        public string GetPlayType()
        {
            return _playType;
        }

        private CalculatorAmountComedy()
        {
            _playType = "comedy";
        }

        public static CalculatorAmountComedy CreateNew()
        {
            return new CalculatorAmountComedy();
        }

        public int CalculateAmount(int audience)
        { 
            int amount = 30000;
            if (audience > 20)
            {
                amount += 10000 + 500 * (audience - 20);
            }
            amount += 300 * audience;
            return amount;
        }
    }
}
