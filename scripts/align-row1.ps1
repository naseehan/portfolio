Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class AlignRow1
{
    public static void Run()
    {
        string srcPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\test-orig-sheet-row1.png";
        string outPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\test-aligned-row1.png";

        using (Bitmap src = new Bitmap(srcPath))
        using (Bitmap dst = new Bitmap(160 * 6, 160, PixelFormat.Format32bppArgb))
        {
            using (Graphics g = Graphics.FromImage(dst))
            {
                g.Clear(Color.Transparent);
            }

            // Shifts per frame to lock ground baseline to Y=148:
            // Frame 0: was at Y=151 -> shift Y by -3
            // Frame 1: was at Y=146 -> shift Y by +2
            // Frame 2: was at Y=147 -> shift Y by +1
            // Frame 3: was at Y=147 -> shift Y by +1
            // Frame 4: airborne phase -> keep at Y=144 (shift Y by -2)
            // Frame 5: landing -> shift Y by +2 to hit Y=147
            int[] dy = new int[] { -3, +2, +1, +1, -2, +2 };
            int[] dx = new int[] { 0, 0, 0, 0, 0, 0 };

            for (int f = 0; f < 6; f++)
            {
                int srcX = f * 160;
                int dstX = f * 160;

                for (int y = 0; y < 160; y++)
                {
                    for (int x = 0; x < 160; x++)
                    {
                        Color c = src.GetPixel(srcX + x, y);
                        if (c.A > 50)
                        {
                            int targetX = x + dx[f];
                            int targetY = y + dy[f];

                            // Clean any floor clipping artifacts
                            if (targetY > 148) continue;

                            if (targetX >= 0 && targetX < 160 && targetY >= 0 && targetY < 160)
                            {
                                dst.SetPixel(dstX + targetX, targetY, c);
                            }
                        }
                    }
                }
            }

            dst.Save(outPath, ImageFormat.Png);
            Console.WriteLine("Saved " + outPath);
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[AlignRow1]::Run()
