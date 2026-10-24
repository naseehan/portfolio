Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class SpriteSheetBuilder
{
    public static void Build()
    {
        string srcPath = @"C:\Users\Naseeh\.gemini\antigravity\brain\856fcf74-1470-4652-8298-c8e7d89017f3\.user_uploaded\media_1792837447249_491e6852.jpg";
        string outPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet.png";

        int cellW = 160;
        int cellH = 160;
        int cols = 6;
        int rows = 6;
        int sheetW = cellW * cols; // 960
        int sheetH = cellH * rows; // 960
        int destBaselineY = 148;

        int[,] rowRanges = new int[,] {
            { 45, 180 },
            { 215, 340 },
            { 370, 500 },
            { 525, 680 },
            { 710, 840 },
            { 860, 1000 }
        };

        int[,] colRanges = new int[,] {
            { 20, 175 },
            { 180, 345 },
            { 350, 515 },
            { 520, 680 },
            { 685, 850 },
            { 860, 1015 }
        };

        int[] baselines = new int[] { 173, 329, 490, 670, 830, 993 };

        using (Bitmap src = new Bitmap(srcPath))
        using (Bitmap sheet = new Bitmap(sheetW, sheetH, PixelFormat.Format32bppArgb))
        {
            // Clear entire sheet to transparent
            using (Graphics g = Graphics.FromImage(sheet))
            {
                g.Clear(Color.FromArgb(0, 0, 0, 0));
            }

            for (int r = 0; r < rows; r++)
            {
                int baseGround = baselines[r];
                for (int c = 0; c < cols; c++)
                {
                    int minY = rowRanges[r, 0], maxY = rowRanges[r, 1];
                    int minX = colRanges[c, 0], maxX = colRanges[c, 1];
                    int cropW = maxX - minX + 1;
                    int cropH = maxY - minY + 1;

                    // 1. Flood fill from outer perimeter of cell
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

                    // 2. Determine sprite bounding box and horizontal center
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

                    if (bMinX > bMaxX) continue; // Empty frame

                    // Horizontal pivot
                    int pivotX = (bMinX + bMaxX) / 2;

                    // Special horizontal alignment for Row 0 (Idle): align on feet midpoint so feet don't jitter
                    if (r == 0)
                    {
                        // Scan for paws near bottom
                        int frontPaw = -1, hindPaw = -1;
                        for (int x = bMaxX; x >= bMinX; x--)
                        {
                            for (int y = cropH - 10; y < cropH; y++)
                            {
                                if (!isBg[x, y])
                                {
                                    Color p = src.GetPixel(minX + x, minY + y);
                                    if (p.R > 180 && p.G > 160 && p.B > 140) { frontPaw = x; break; }
                                }
                            }
                            if (frontPaw != -1) break;
                        }
                        for (int x = bMinX; x <= bMaxX; x++)
                        {
                            for (int y = cropH - 10; y < cropH; y++)
                            {
                                if (!isBg[x, y])
                                {
                                    Color p = src.GetPixel(minX + x, minY + y);
                                    if (p.R > 180 && p.G > 160 && p.B > 140) { hindPaw = x; break; }
                                }
                            }
                            if (hindPaw != -1) break;
                        }
                        if (frontPaw != -1 && hindPaw != -1)
                        {
                            pivotX = (frontPaw + hindPaw) / 2;
                        }
                    }

                    // Offset to place sprite inside destination cell:
                    // Center pivotX at cell center (cellW / 2 = 80)
                    int destOriginX = (c * cellW) + (cellW / 2) - pivotX;
                    // Align baseGround with destBaselineY (148)
                    int destOriginY = (r * cellH) + destBaselineY - (baseGround - minY);

                    // 3. Blit pixels onto destination cell
                    for (int y = 0; y < cropH; y++)
                    {
                        for (int x = 0; x < cropW; x++)
                        {
                            if (!isBg[x, y])
                            {
                                int dx = destOriginX + x;
                                int dy = destOriginY + y;

                                // Safety bounds check within destination cell
                                int cellStartX = c * cellW;
                                int cellEndX = cellStartX + cellW;
                                int cellStartY = r * cellH;
                                int cellEndY = cellStartY + cellH;

                                if (dx >= cellStartX && dx < cellEndX && dy >= cellStartY && dy < cellEndY)
                                {
                                    Color p = src.GetPixel(minX + x, minY + y);
                                    sheet.SetPixel(dx, dy, Color.FromArgb(255, p.R, p.G, p.B));
                                }
                            }
                        }
                    }
                }
            }

            // Apply anatomical leg refinement to Row 1 (Run)
            ApplyRunLegRefinement(sheet);

            sheet.Save(outPath, ImageFormat.Png);
            Console.WriteLine("Sprite sheet built successfully at: " + outPath);
            Console.WriteLine(string.Format("Dimensions: {0}x{1}px, Cell: {2}x{3}px, Cols: {4}, Rows: {5}",
                sheetW, sheetH, cellW, cellH, cols, rows));
        }
    }

    private static Color cOutline = Color.FromArgb(255, 42, 16, 8);
    private static Color cOrange = Color.FromArgb(255, 250, 130, 43);
    private static Color cOrangeDark = Color.FromArgb(255, 205, 80, 18);
    private static Color cOrangeHigh = Color.FromArgb(255, 252, 160, 75);
    private static Color cFarOrange = Color.FromArgb(255, 175, 65, 14);
    private static Color cFarOrangeDark = Color.FromArgb(255, 135, 45, 10);
    private static Color cWhite = Color.FromArgb(255, 255, 247, 237);
    private static Color cWhiteShade = Color.FromArgb(255, 238, 218, 200);
    private static Color cFarWhite = Color.FromArgb(255, 215, 190, 170);
    private static Color cBelly = Color.FromArgb(255, 253, 242, 228);

    private static void SetPix(Bitmap bmp, int x, int y, Color c)
    {
        if (x >= 0 && x < bmp.Width && y >= 0 && y < bmp.Height)
        {
            bmp.SetPixel(x, y, c);
        }
    }

    private static void RenderForeleg(Bitmap bmp, int offX, int sx, int sy, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarOrange : cOrange;
        Color furShade = isFar ? cFarOrangeDark : cOrangeDark;
        Color pawCol = isFar ? cFarWhite : cWhite;
        Color pawShd = isFar ? cFarWhite : cWhiteShade;

        int steps = Math.Max(Math.Abs(px - sx), Math.Abs((py - 6) - sy)) + 1;
        for (int i = 0; i <= steps; i++)
        {
            float t = (float)i / steps;
            int cx = (int)(sx + t * (px - sx));
            int cy = (int)(sy + t * ((py - 6) - sy));
            int w = (int)(15 - t * 2);
            int half = w / 2;
            for (int dx = -half; dx <= half; dx++)
            {
                bool edge = (dx == -half || dx == half);
                Color c = edge ? cOutline : (!isFar && dx < -half / 3 ? cOrangeHigh : (dx > half / 3 ? furShade : fur));
                SetPix(bmp, offX + cx + dx, cy, c);
            }
        }

        int pw = 16, ph = 10;
        int topY = py - ph + 1;
        for (int y = topY; y <= py; y++)
        {
            int rowW = pw;
            if (y == topY) rowW -= 4;
            else if (y == topY + 1 || y == py) rowW -= 2;

            int left = px - rowW / 2;
            for (int x = 0; x < rowW; x++)
            {
                int curX = left + x;
                bool border = (x == 0 || x == rowW - 1 || y == topY || y == py);
                Color fill = border ? cOutline : (y >= py - 3 ? pawShd : pawCol);
                SetPix(bmp, offX + curX, y, fill);
            }
        }

        if (!isFar)
        {
            SetPix(bmp, offX + px - 2, py - 2, cOutline);
            SetPix(bmp, offX + px + 2, py - 2, cOutline);
        }
    }

    private static void RenderHindleg(Bitmap bmp, int offX, int hx, int hy, int kx, int ky, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarOrange : cOrange;
        Color furShade = isFar ? cFarOrangeDark : cOrangeDark;
        Color pawCol = isFar ? cFarWhite : cWhite;
        Color pawShd = isFar ? cFarWhite : cWhiteShade;

        int steps1 = Math.Max(Math.Abs(kx - hx), Math.Abs(ky - hy)) + 1;
        for (int i = 0; i <= steps1; i++)
        {
            float t = (float)i / steps1;
            int cx = (int)(hx + t * (kx - hx));
            int cy = (int)(hy + t * (ky - hy));
            int w = (int)(20 - t * 4);
            int half = w / 2;
            for (int dx = -half; dx <= half; dx++)
            {
                bool edge = (dx == -half || dx == half);
                Color c = edge ? cOutline : (!isFar && dx < -half / 3 ? cOrangeHigh : (dx > half / 3 ? furShade : fur));
                SetPix(bmp, offX + cx + dx, cy, c);
            }
        }

        int steps2 = Math.Max(Math.Abs(px - kx), Math.Abs((py - 6) - ky)) + 1;
        for (int i = 0; i <= steps2; i++)
        {
            float t = (float)i / steps2;
            int cx = (int)(kx + t * (px - kx));
            int cy = (int)(ky + t * ((py - 6) - ky));
            int w = (int)(15 - t * 2);
            int half = w / 2;
            for (int dx = -half; dx <= half; dx++)
            {
                bool edge = (dx == -half || dx == half);
                SetPix(bmp, offX + cx + dx, cy, edge ? cOutline : furShade);
            }
        }

        int pw = 16, ph = 10;
        int topY = py - ph + 1;
        for (int y = topY; y <= py; y++)
        {
            int rowW = pw;
            if (y == topY) rowW -= 4;
            else if (y == topY + 1 || y == py) rowW -= 2;

            int left = px - rowW / 2;
            for (int x = 0; x < rowW; x++)
            {
                int curX = left + x;
                bool border = (x == 0 || x == rowW - 1 || y == topY || y == py);
                Color fill = border ? cOutline : (y >= py - 3 ? pawShd : pawCol);
                SetPix(bmp, offX + curX, y, fill);
            }
        }

        if (!isFar)
        {
            SetPix(bmp, offX + px - 2, py - 2, cOutline);
            SetPix(bmp, offX + px + 2, py - 2, cOutline);
        }
    }

    private static void ApplyRunLegRefinement(Bitmap sheet)
    {
        int cellW = 160, cellH = 160;
        int r = 1;
        int baseYOffset = r * cellH;

        for (int f = 0; f < 6; f++)
        {
            int offX = f * cellW;

            // Clear belly artifact and old paws
            for (int y = 126; y <= 152; y++)
            {
                for (int x = 48; x <= 92; x++)
                {
                    sheet.SetPixel(offX + x, baseYOffset + y, Color.Transparent);
                }
            }
            for (int y = 134; y <= 152; y++)
            {
                for (int x = 10; x <= 150; x++)
                {
                    sheet.SetPixel(offX + x, baseYOffset + y, Color.Transparent);
                }
            }

            // Smooth belly contour
            for (int x = 46; x <= 102; x++)
            {
                float norm = (float)(x - 46) / (102 - 46);
                int arc = (int)(Math.Sin(norm * Math.PI) * 4);
                int by = baseYOffset + 122 + arc;

                SetPix(sheet, offX + x, by, cOutline);
                SetPix(sheet, offX + x, by - 1, cBelly);
                SetPix(sheet, offX + x, by - 2, cBelly);
                SetPix(sheet, offX + x, by - 3, cWhite);
                SetPix(sheet, offX + x, by - 4, cWhite);
            }

            if (f == 0)
            {
                RenderHindleg(sheet, offX, 44, baseYOffset + 120, 32, baseYOffset + 128, 22, baseYOffset + 134, true);
                RenderForeleg(sheet, offX, 102, baseYOffset + 122, 106, baseYOffset + 142, true);
                RenderHindleg(sheet, offX, 54, baseYOffset + 120, 68, baseYOffset + 128, 60, baseYOffset + 138, false);
                RenderForeleg(sheet, offX, 108, baseYOffset + 122, 118, baseYOffset + 148, false);
            }
            else if (f == 1)
            {
                RenderHindleg(sheet, offX, 46, baseYOffset + 120, 50, baseYOffset + 128, 40, baseYOffset + 138, true);
                RenderForeleg(sheet, offX, 112, baseYOffset + 122, 116, baseYOffset + 148, true);
                RenderHindleg(sheet, offX, 56, baseYOffset + 120, 72, baseYOffset + 124, 64, baseYOffset + 130, false);
                RenderForeleg(sheet, offX, 102, baseYOffset + 122, 104, baseYOffset + 148, false);
            }
            else if (f == 2)
            {
                RenderForeleg(sheet, offX, 104, baseYOffset + 122, 94, baseYOffset + 140, true);
                RenderHindleg(sheet, offX, 46, baseYOffset + 120, 54, baseYOffset + 132, 56, baseYOffset + 148, true);
                RenderForeleg(sheet, offX, 98, baseYOffset + 122, 86, baseYOffset + 144, false);
                RenderHindleg(sheet, offX, 56, baseYOffset + 120, 66, baseYOffset + 134, 70, baseYOffset + 148, false);
            }
            else if (f == 3)
            {
                RenderForeleg(sheet, offX, 108, baseYOffset + 122, 116, baseYOffset + 134, true);
                RenderHindleg(sheet, offX, 44, baseYOffset + 120, 36, baseYOffset + 130, 28, baseYOffset + 144, true);
                RenderForeleg(sheet, offX, 102, baseYOffset + 122, 106, baseYOffset + 128, false);
                RenderHindleg(sheet, offX, 54, baseYOffset + 120, 44, baseYOffset + 132, 40, baseYOffset + 148, false);
            }
            else if (f == 4)
            {
                RenderHindleg(sheet, offX, 44, baseYOffset + 120, 32, baseYOffset + 128, 24, baseYOffset + 134, true);
                RenderForeleg(sheet, offX, 108, baseYOffset + 122, 118, baseYOffset + 134, true);
                RenderHindleg(sheet, offX, 52, baseYOffset + 120, 30, baseYOffset + 126, 18, baseYOffset + 132, false);
                RenderForeleg(sheet, offX, 104, baseYOffset + 122, 126, baseYOffset + 130, false);
            }
            else if (f == 5)
            {
                RenderForeleg(sheet, offX, 100, baseYOffset + 122, 106, baseYOffset + 136, true);
                RenderHindleg(sheet, offX, 42, baseYOffset + 120, 48, baseYOffset + 128, 50, baseYOffset + 132, true);
                RenderHindleg(sheet, offX, 50, baseYOffset + 120, 46, baseYOffset + 128, 42, baseYOffset + 136, false);
                RenderForeleg(sheet, offX, 106, baseYOffset + 122, 114, baseYOffset + 144, false);
            }
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[SpriteSheetBuilder]::Build()
