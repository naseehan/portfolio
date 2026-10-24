Add-Type -TypeDefinition @"
using System;
using System.Drawing;

public class FaceDetector
{
    public static void Find()
    {
        string sheetPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet.png";
        using (Bitmap sheet = new Bitmap(sheetPath))
        {
            for (int y = 60; y <= 105; y += 2)
            {
                string line = string.Format("{0,2}: ", y);
                for (int x = 80; x <= 140; x += 2)
                {
                    Color p = sheet.GetPixel(x, y);
                    if (p.A == 0) line += " ";
                    else if (p.R < 50 && p.G < 50 && p.B < 50) line += "#";
                    else if (p.R > 200 && p.G > 180) line += "W";
                    else if (p.R > 180 && p.G > 90) line += "O";
                    else line += ".";
                }
                Console.WriteLine(line);
            }
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[FaceDetector]::Find()
