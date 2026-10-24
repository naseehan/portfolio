Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class HighFidelityRunBuilder
{
    private static Color cOutline = Color.FromArgb(255, 42, 16, 8);
    private static Color cOrange = Color.FromArgb(255, 250, 130, 43);
    private static Color cOrangeShade = Color.FromArgb(255, 205, 80, 18);
    private static Color cOrangeHigh = Color.FromArgb(255, 252, 160, 75);
    private static Color cFarOrange = Color.FromArgb(255, 175, 65, 14);
    private static Color cFarOrangeShade = Color.FromArgb(255, 135, 45, 10);
    private static Color cWhite = Color.FromArgb(255, 255, 247, 237);
    private static Color cWhiteShade = Color.FromArgb(255, 240, 222, 205);
    private static Color cFarWhite = Color.FromArgb(255, 218, 195, 175);
    private static Color cBelly = Color.FromArgb(255, 252, 238, 220);

    private static void SetPix(Bitmap bmp, int x, int y, Color c)
    {
        if (x >= 0 && x < bmp.Width && y >= 0 && y < bmp.Height)
        {
            bmp.SetPixel(x, y, c);
        }
    }

    private static void FillCircle(Bitmap bmp, int cx, int cy, int r, Color fill, Color outline)
    {
        for (int dy = -r; dy <= r; dy++)
        {
            for (int dx = -r; dx <= r; dx++)
            {
                int distSq = dx * dx + dy * dy;
                if (distSq <= r * r)
                {
                    if (distSq >= (r - 1) * (r - 1) && r >= 2)
                        SetPix(bmp, cx + dx, cy + dy, outline);
                    else
                        SetPix(bmp, cx + dx, cy + dy, fill);
                }
            }
        }
    }

    // Draws an anatomical digitigrade foreleg with paw
    public static void RenderForeleg(Bitmap bmp, int offX, int sx, int sy, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarOrange : cOrange;
        Color furShade = isFar ? cFarOrangeShade : cOrangeShade;
        Color pawCol = isFar ? cFarWhite : cWhite;
        Color pawShd = isFar ? cFarWhite : cWhiteShade;

        // Trace line from shoulder (sx, sy) down to wrist (px, py - 6)
        int wx = (sx + px) / 2;
        int wy = py - 7;

        // Shoulder to wrist stroke (width 9 tapering to 8)
        int steps = Math.Max(Math.Abs(wx - sx), Math.Abs(wy - sy)) + 1;
        for (int i = 0; i <= steps; i++)
        {
            float t = (float)i / steps;
            int cx = (int)(sx + t * (wx - sx));
            int cy = (int)(sy + t * (wy - sy));
            int w = (int)(9 - t * 2);
            for (int dx = -w / 2; dx <= w / 2; dx++)
            {
                bool edge = (dx == -w / 2 || dx == w / 2);
                SetPix(bmp, offX + cx + dx, cy, edge ? cOutline : (dx < 0 && !isFar ? cOrangeHigh : fur));
            }
        }

        // Wrist to paw stroke
        int steps2 = Math.Max(Math.Abs(px - wx), Math.Abs(py - wy)) + 1;
        for (int i = 0; i <= steps2; i++)
        {
            float t = (float)i / steps2;
            int cx = (int)(wx + t * (px - wx));
            int cy = (int)(wy + t * (py - wy));
            int w = 7;
            for (int dx = -w / 2; dx <= w / 2; dx++)
            {
                bool edge = (dx == -w / 2 || dx == w / 2);
                SetPix(bmp, offX + cx + dx, cy, edge ? cOutline : furShade);
            }
        }

        // White Mitten Paw (width 12, height 8) at (px, py)
        int pw = 12, ph = 8;
        int topY = py - ph + 1;
        for (int y = topY; y <= py; y++)
        {
            int rowW = pw;
            if (y == topY || y == py) rowW -= 2; // rounded caps
            int left = px - rowW / 2;
            for (int x = 0; x < rowW; x++)
            {
                int curX = left + x;
                bool border = (x == 0 || x == rowW - 1 || y == topY || y == py);
                if (border)
                {
                    SetPix(bmp, offX + curX, y, cOutline);
                }
                else
                {
                    Color fill = (y >= py - 2) ? pawShd : pawCol;
                    SetPix(bmp, offX + curX, y, fill);
                }
            }
        }

        // Paw toe split lines for cute pixel detail
        if (!isFar)
        {
            SetPix(bmp, offX + px - 1, py - 2, cOutline);
            SetPix(bmp, offX + px + 2, py - 2, cOutline);
        }
    }

    // Draws an anatomical digitigrade hindleg (thigh, hock, metatarsus, paw)
    public static void RenderHindleg(Bitmap bmp, int offX, int hx, int hy, int kx, int ky, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarOrange : cOrange;
        Color furShade = isFar ? cFarOrangeShade : cOrangeShade;
        Color pawCol = isFar ? cFarWhite : cWhite;
        Color pawShd = isFar ? cFarWhite : cWhiteShade;

        // 1. Thigh (Hip to Knee/Hock): wide muscular curve (width 14 down to 10)
        int steps1 = Math.Max(Math.Abs(kx - hx), Math.Abs(ky - hy)) + 1;
        for (int i = 0; i <= steps1; i++)
        {
            float t = (float)i / steps1;
            int cx = (int)(hx + t * (kx - hx));
            int cy = (int)(hy + t * (ky - hy));
            int w = (int)(13 - t * 3);
            for (int dx = -w / 2; dx <= w / 2; dx++)
            {
                bool edge = (dx == -w / 2 || dx == w / 2);
                Color c = edge ? cOutline : (!isFar && dx < 0 ? cOrangeHigh : (dx > w / 4 ? furShade : fur));
                SetPix(bmp, offX + cx + dx, cy, c);
            }
        }

        // 2. Hock to Ankle/Paw (width 9 tapering to 8)
        int steps2 = Math.Max(Math.Abs(px - kx), Math.Abs((py - 6) - ky)) + 1;
        for (int i = 0; i <= steps2; i++)
        {
            float t = (float)i / steps2;
            int cx = (int)(kx + t * (px - kx));
            int cy = (int)(ky + t * ((py - 6) - ky));
            int w = (int)(9 - t * 2);
            for (int dx = -w / 2; dx <= w / 2; dx++)
            {
                bool edge = (dx == -w / 2 || dx == w / 2);
                SetPix(bmp, offX + cx + dx, cy, edge ? cOutline : furShade);
            }
        }

        // 3. White Hind Paw Mitten at (px, py)
        int pw = 13, ph = 8;
        int topY = py - ph + 1;
        for (int y = topY; y <= py; y++)
        {
            int rowW = pw;
            if (y == topY || y == py) rowW -= 2;
            int left = px - rowW / 2;
            for (int x = 0; x < rowW; x++)
            {
                int curX = left + x;
                bool border = (x == 0 || x == rowW - 1 || y == topY || y == py);
                if (border)
                {
                    SetPix(bmp, offX + curX, y, cOutline);
                }
                else
                {
                    Color fill = (y >= py - 2) ? pawShd : pawCol;
                    SetPix(bmp, offX + curX, y, fill);
                }
            }
        }

        if (!isFar)
        {
            SetPix(bmp, offX + px - 1, py - 2, cOutline);
            SetPix(bmp, offX + px + 2, py - 2, cOutline);
        }
    }

    public static void RenderBelly(Bitmap bmp, int offX, int startX, int endX, int baseY)
    {
        for (int x = startX; x <= endX; x++)
        {
            float norm = (float)(x - startX) / (endX - startX);
            int arc = (int)(Math.Sin(norm * Math.PI) * 3);
            int y = baseY + arc;

            SetPix(bmp, offX + x, y, cOutline);
            SetPix(bmp, offX + x, y - 1, cBelly);
            SetPix(bmp, offX + x, y - 2, cBelly);
            SetPix(bmp, offX + x, y - 3, cWhite);
            SetPix(bmp, offX + x, y - 4, cOrange);
            SetPix(bmp, offX + x, y - 5, cOrange);
        }
    }

    public static void BuildStrip()
    {
        string sheetPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet.png";
        using (Bitmap sheet = new Bitmap(sheetPath))
        {
            int cellW = 160, cellH = 160;
            using (Bitmap strip = new Bitmap(cellW * 6, cellH, PixelFormat.Format32bppArgb))
            {
                using (Graphics g = Graphics.FromImage(strip))
                {
                    g.Clear(Color.Transparent);
                    for (int f = 0; f < 6; f++)
                    {
                        // Copy upper body (Y = 0..116)
                        g.DrawImage(sheet, new Rectangle(f * cellW, 0, cellW, 116),
                            new Rectangle(f * cellW, 160, cellW, 116), GraphicsUnit.Pixel);
                    }
                }

                // Render each frame's legs & belly
                for (int f = 0; f < 6; f++)
                {
                    int offX = f * cellW;

                    if (f == 0)
                    {
                        // Frame 0: Front Contact (Lead strike at Y=148)
                        // Far hindleg extended back
                        RenderHindleg(strip, offX, 42, 115, 30, 126, 22, 134, true);
                        // Far foreleg hovering just behind lead
                        RenderForeleg(strip, offX, 102, 116, 108, 142, true);
                        // Clean Belly
                        RenderBelly(strip, offX, 46, 102, 122);
                        // Near hindleg swinging forward
                        RenderHindleg(strip, offX, 52, 115, 64, 126, 56, 138, false);
                        // Near foreleg lead contact on ground baseline (Y=148)!
                        RenderForeleg(strip, offX, 108, 116, 118, 148, false);
                    }
                    else if (f == 1)
                    {
                        // Frame 1: Front Compression (Weight-bearing stance)
                        // Far hindleg sweeping forward
                        RenderHindleg(strip, offX, 44, 115, 48, 128, 40, 138, true);
                        // Far foreleg planted on ground beside lead
                        RenderForeleg(strip, offX, 112, 116, 116, 148, true);
                        // Clean Belly
                        RenderBelly(strip, offX, 46, 102, 124);
                        // Near hindleg tucked under belly, coiled!
                        RenderHindleg(strip, offX, 54, 115, 68, 124, 62, 130, false);
                        // Near foreleg planted under chest bearing full body weight (Y=148)
                        RenderForeleg(strip, offX, 102, 116, 104, 148, false);
                    }
                    else if (f == 2)
                    {
                        // Frame 2: Front Push-Off & Hind Strike (Transition)
                        // Far foreleg lifting off ground
                        RenderForeleg(strip, offX, 104, 116, 96, 140, true);
                        // Far hindleg touching down behind near hind
                        RenderHindleg(strip, offX, 44, 115, 50, 132, 54, 148, true);
                        // Clean Belly
                        RenderBelly(strip, offX, 46, 102, 122);
                        // Near foreleg pushing back off ground
                        RenderForeleg(strip, offX, 98, 116, 88, 144, false);
                        // Near hindleg firm strike on ground (Y=148)
                        RenderHindleg(strip, offX, 54, 115, 62, 134, 68, 148, false);
                    }
                    else if (f == 3)
                    {
                        // Frame 3: Hind Launch / Propulsion (Springing forward)
                        // Far foreleg reaching forward through air
                        RenderForeleg(strip, offX, 108, 116, 116, 134, true);
                        // Far hindleg pushing off
                        RenderHindleg(strip, offX, 42, 116, 34, 130, 28, 144, true);
                        // Clean Belly
                        RenderBelly(strip, offX, 46, 102, 120);
                        // Near foreleg folded high under chest
                        RenderForeleg(strip, offX, 102, 116, 106, 128, false);
                        // Near hindleg full extension drive against floor (Y=148)
                        RenderHindleg(strip, offX, 52, 116, 42, 132, 38, 148, false);
                    }
                    else if (f == 4)
                    {
                        // Frame 4: Full Extension / Airborne Phase (All 4 paws in flight!)
                        // Far hindleg stretched back in air
                        RenderHindleg(strip, offX, 42, 116, 30, 128, 24, 134, true);
                        // Far foreleg extended forward in air
                        RenderForeleg(strip, offX, 108, 116, 118, 134, true);
                        // Clean Belly
                        RenderBelly(strip, offX, 46, 102, 121);
                        // Near hindleg kicking fully back in air (Y=132)
                        RenderHindleg(strip, offX, 50, 116, 28, 126, 18, 132, false);
                        // Near foreleg reaching fully forward in air (Y=130)
                        RenderForeleg(strip, offX, 104, 116, 126, 130, false);
                    }
                    else if (f == 5)
                    {
                        // Frame 5: Gather & Descent (Preparing for landing)
                        // Far foreleg trailing behind RF
                        RenderForeleg(strip, offX, 100, 116, 106, 136, true);
                        // Far hindleg folding forward under hip
                        RenderHindleg(strip, offX, 40, 116, 46, 128, 48, 132, true);
                        // Clean Belly
                        RenderBelly(strip, offX, 46, 102, 123);
                        // Near hindleg drawing forward under pelvis
                        RenderHindleg(strip, offX, 48, 116, 44, 128, 40, 136, false);
                        // Near foreleg descending toward ground (Y=144, 4px from ground)
                        RenderForeleg(strip, offX, 106, 116, 114, 144, false);
                    }
                }

                string outPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\test-refined-strip-v2.png";
                strip.Save(outPath, ImageFormat.Png);
                Console.WriteLine("Saved test refined strip v2 to: " + outPath);
            }
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[HighFidelityRunBuilder]::BuildStrip()
