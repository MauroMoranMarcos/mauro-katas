using System;
using System.Collections.Generic;
using System.Text;

namespace TheatricalPlayersRefactoringKata
{
    public class CalculatorVolumeCreditsComedy : ACalculatorVolumeCredits
    {
        private readonly string _playType;

        public override string playType => _playType;

        private CalculatorVolumeCreditsComedy() 
        {
            _playType = "comedy";
        }

        public static CalculatorVolumeCreditsComedy CreateNew()
        {
            return new CalculatorVolumeCreditsComedy();
        }

        public override int AddVolumeCredits(int audience)
        {
            int baseCredits = base.AddVolumeCredits(audience);
            return baseCredits + audience / 5;
        }
    }
}
