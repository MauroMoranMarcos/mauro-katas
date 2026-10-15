using System;
using System.Collections.Generic;
using System.Text;

namespace TheatricalPlayersRefactoringKata
{
    public class CalculatorAmountTragedy : ICalculatorAmount
    {
        private readonly string _playType;

        public string GetPlayType()
        {
            return _playType;
        }

        private CalculatorAmountTragedy()
        {
            _playType = "tragedy";
        }

        public static CalculatorAmountTragedy CreateNew()
        {
            return new CalculatorAmountTragedy();
        }

        public int CalculateAmount(int audience)
        {
            int amount = 40000;
            if (audience > 30)
            {
                amount += 1000 * (audience - 30);
            }
            return amount;
        }
    }
}
