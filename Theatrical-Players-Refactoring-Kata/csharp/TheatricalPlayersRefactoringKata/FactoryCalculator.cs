using System;
using System.Collections.Generic;

namespace TheatricalPlayersRefactoringKata
{
    public class FactoryCalculator
    {
        public static readonly Dictionary<string, ICalculatorAmount> AmountCalculatorsDictionary;
        public static readonly Dictionary<string, ICalculatorVolumeCredits> VolumeCreditsCalculatorsDictionary;

        static FactoryCalculator()
        {
            AmountCalculatorsDictionary = new Dictionary<string, ICalculatorAmount>
            {
                { "tragedy", CalculatorAmountTragedy.CreateNew() },
                { "comedy", CalculatorAmountComedy.CreateNew() }
            };

            VolumeCreditsCalculatorsDictionary = new Dictionary<string, ICalculatorVolumeCredits>
            {
                { "tragedy", CalculatorVolumeCreditsTragedy.CreateNew() },
                { "comedy", CalculatorVolumeCreditsComedy.CreateNew() }
            };
        }
    }
}
