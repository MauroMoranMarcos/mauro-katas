using System;
using System.Collections.Generic;
using System.Text;

namespace TheatricalPlayersRefactoringKata
{
    public abstract class ACalculatorVolumeCredits : ICalculatorVolumeCredits
    {
        public abstract string playType { get; }

        public virtual int AddVolumeCredits(int audience)
        {
            return Math.Max(audience - 30, 0);
        }
    }
}
