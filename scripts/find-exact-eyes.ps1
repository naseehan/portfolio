Add-Type -TypeDefinition @"
using System;
using System.Drawing;

public class ExactEyeDetector
{
    public static void Find()
    {
        string sheetPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet.png";
        using (Bitmap sheet = new Bitmap(sheetPath))
        {
            // Sample Idle Frame 0: X in cell = 110..135, Y in cell = 75..100
            for (int y = 75; y <= 98; y++)
            {
                string line = string.Format("{0,2}: ", y);
                for (int x = 110; x <= 136; x++)
                {
                    Color p = sheet.GetPixel(x, y);
                    if (p.A == 0) line += " ";
                    else if (p.R < 45 && p.G < 45 && p.B < 45) line += "#"; // pupil/black
                    else if (p.R > 230 && p.G > 230 && p.B > 230) line += "G"; // eye glint
                    else if (p.R > 200 && p.G > 180) line += "W"; // white fur
                    else if (p.R > 180 && p.G > 100) line += "O"; // orange fur
                    else line += ".";
                }
                Console.WriteLine(line);
            }
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[ExactEyeDetector]::Find()
