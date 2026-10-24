Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class CleanSheetBuilder
{
    public static void Build()
    {
        string srcPath = @"C:\Users\Naseeh\.gemini\antigravity\brain\856fcf74-1470-4652-8298-c8e7d89017f3\.user_uploaded\media_1792837447249_491e6852.jpg";
        string outPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\test-orig-sheet-row1.png";

        int cellW = 160;
        int cellH = 160;
        int cols = 6;
        int destBaselineY = 148;

        int minY = 215, maxY = 340;
        int[,] colRanges = new int[,] {
            { 20, 175 },
            { 180, 345 },
            { 350, 515 },
            { 520, 680 },
            { 685, 850 },
            { 860, 1015 }
        };

        int baseGround = 330;

        using (Bitmap src = new Bitmap(srcPath))
        using (Bitmap strip = new Bitmap(cellW * cols, cellH, PixelFormat.Format32bppArgb))
        {
            using (Graphics g = Graphics.FromImage(strip))
            {
                g.Clear(Color.FromArgb(0, 0, 0, 0));
            }

            for (int c = 0; c < cols; c++)
            {
                int minX = colRanges[c, 0], maxX = colRanges[c, 1];
                int cropW = maxX - minX + 1;
                int cropH = maxY - minY + 1;

                bool[,] isBg = new bool[cropW, cropH];
                Queue<Point> queue = new Queue<Point>();

                for (int x = 0; x < cropW; x++) {
                    queue.Enqueue(new Point(x, 0)); isBg[x, 0] = true;
                    queue.Enqueue(new Point(x, cropH - 1)); isBg[x, cropH - 1] = true;
                }
                for (int y = 0; y < cropH; y++) {
                    queue.Enqueue(new Point(0, y)); isBg[0, y] = true;
                    queue.Enqueue(new Point(cropW - 1, y)); isBg[cropW - 1, y] = true;
                }

                int threshold = 32;
                while (queue.Count > 0)
                {
                    Point pt = queue.Dequeue();
                    Point[] nbs = new Point[] {
                        new Point(pt.X + 1, pt.Y), new Point(pt.X - 1, pt.Y),
                        new Point(pt.X, pt.Y + 1), new Point(pt.X, pt.Y - 1)
                    };
                    foreach (var n in nbs)
                    {
                        if (n.X >= 0 && n.X < cropW && n.Y >= 0 && n.Y < cropH && !isBg[n.X, n.Y])
                        {
                            Color p = src.GetPixel(minX + n.X, minY + n.Y);
                            if (Math.Max(p.R, Math.Max(p.G, p.B)) <= threshold)
                            {
                                isBg[n.X, n.Y] = true;
                                queue.Enqueue(n);
                            }
                        }
                    }
                }

                int bMinX = 9999, bMaxX = -1;
                for (int y = 0; y < cropH; y++)
                {
                    for (int x = 0; x < cropW; x++)
                    {
                        if (!isBg[x, y])
                        {
                            if (x < bMinX) bMinX = x;
                            if (x > bMaxX) bMaxX = x;
                        }
                    }
                }

                if (bMinX > bMaxX) continue;

                int pivotX = (bMinX + bMaxX) / 2;
                int destOriginX = (c * cellW) + (cellW / 2) - pivotX;
                int destOriginY = destBaselineY - (baseGround - minY);

                for (int y = 0; y < cropH; y++)
                {
                    for (int x = 0; x < cropW; x++)
                    {
                        if (!isBg[x, y])
                        {
                            int dx = destOriginX + x;
                            int dy = destOriginY + y;

                            int cellStartX = c * cellW;
                            int cellEndX = cellStartX + cellW;

                            if (dx >= cellStartX && dx < cellEndX && dy >= 0 && dy < cellH)
                            {
                                Color p = src.GetPixel(minX + x, minY + y);
                                strip.SetPixel(dx, dy, Color.FromArgb(255, p.R, p.G, p.B));
                            }
                        }
                    }
                }
            }

            strip.Save(outPath, ImageFormat.Png);
            Console.WriteLine("Saved " + outPath);
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[CleanSheetBuilder]::Build()
