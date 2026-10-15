using System;
using System.Collections.Generic;
using System.Globalization;

namespace TheatricalPlayersRefactoringKata;

public class StatementPrinter(Dictionary<string, Play> plays)
{
    private readonly Dictionary<string, Play> _plays = plays;
    private readonly CultureInfo _cultureInfo = new("en-US");

    public string Print(Invoice invoice)
    {
        var totalAmount = 0;
        var volumeCredits = 0;
        var result = $"Statement for {invoice.Customer}\n";

        foreach (var perf in invoice.Performances)
        {
            var thisAmount = 0;
            var play = _plays[perf.PlayID];

            volumeCredits += CalculateVolumeCredits(play.Type, perf.Audience);

            thisAmount = CalculateAmount(play.Type, perf.Audience);

            result += PrintOrderLine(play.Name, thisAmount, perf.Audience, _cultureInfo);
            totalAmount += thisAmount;
        }

        result += PrintInvoiceResume(totalAmount, volumeCredits, _cultureInfo);
        return result;
    }

    private int CalculateAmount(string playType, int audience)
    {
        int thisAmount = 0;

        FactoryCalculator.AmountCalculatorsDictionary.TryGetValue(playType, out var amountCalculator);

        if (amountCalculator == null)
        {
            throw new Exception("unknown type: " + playType);
        }
        
        thisAmount = amountCalculator.CalculateAmount(audience);

        return thisAmount;
    }

    private int CalculateVolumeCredits(string playType, int audience)
    {
        int volumeCredits = 0;

        FactoryCalculator.VolumeCreditsCalculatorsDictionary.TryGetValue(playType, out var volumeCreditsCalculator);

        if (volumeCreditsCalculator == null)
        {
            throw new Exception("unknown type: " + playType);
        }

        volumeCredits += volumeCreditsCalculator.AddVolumeCredits(audience);

        return volumeCredits;
    }

    private string PrintOrderLine(string playName, int thisAmount, int audience, CultureInfo cultureInfo)
    {
        return $"  {playName}: {(thisAmount / 100m).ToString("C", cultureInfo)} ({audience} seats)\n";
    }

    private string PrintInvoiceResume(int totalAmount, int volumeCredits, CultureInfo cultureInfo)
    {
        return $"Amount owed is {(totalAmount / 100m).ToString("C", cultureInfo)}\nYou earned {volumeCredits} credits\n";
    }
}
