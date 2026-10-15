using System;
using System.Collections.Generic;
using System.Text;

namespace TheatricalPlayersRefactoringKata
{
    public class CalculatorVolumeCreditsTragedy : ACalculatorVolumeCredits
    {
        private readonly string _playType;

        public override string playType => _playType;

        private CalculatorVolumeCreditsTragedy() 
        {
            _playType = "tragedy";
        }

        public static CalculatorVolumeCreditsTragedy CreateNew()
        {
            return new CalculatorVolumeCreditsTragedy();
        }
    }
}
