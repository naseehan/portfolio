Add-Type -TypeDefinition @"
using System;
using System.Drawing;

public class EyePositionFinder
{
    public static void Find()
    {
        string sheetPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet.png";
        using (Bitmap sheet = new Bitmap(sheetPath))
        {
            int cellW = 160;
            // Row 0 is Idle: Y = 0..160
            for (int f = 0; f < 6; f++)
            {
                int minX = 999, maxX = -1, minY = 999, maxY = -1;
                // scan head area: X in cell = 80..140, Y in cell = 60..110
                for (int y = 60; y < 110; y++)
                {
                    for (int x = 80; x < 140; x++)
                    {
                        Color p = sheet.GetPixel(f * cellW + x, y);
                        // Pupil: dark pixel (R<40, G<40, B<40) inside face
                        if (p.A > 0 && p.R < 40 && p.G < 40 && p.B < 40)
                        {
                            if (x < minX) minX = x;
                            if (x > maxX) maxX = x;
                            if (y < minY) minY = y;
                            if (y > maxY) maxY = y;
                        }
                    }
                }
                Console.WriteLine(string.Format("Idle Frame {0}: Eyes Box in 160x160 = X:[{1}..{2}], Y:[{3}..{4}] -> 80x80 = X:[{5}..{6}], Y:[{7}..{8}]",
                    f, minX, maxX, minY, maxY, minX / 2, maxX / 2, minY / 2, maxY / 2));
            }
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[EyePositionFinder]::Find()
