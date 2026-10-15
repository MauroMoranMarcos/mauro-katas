using System;
using System.Collections.Generic;
using System.Text;

namespace TheatricalPlayersRefactoringKata
{
    public interface ICalculatorAmount
    {
        public int CalculateAmount(int audience);
        public string GetPlayType();
    }
}
