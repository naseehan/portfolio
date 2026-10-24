Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class PerfectAnatomicalRunBuilder
{
    private static Color cOut = Color.FromArgb(255, 42, 16, 8);         // #2A1008 dark outline
    private static Color cFur = Color.FromArgb(255, 250, 134, 46);       // #FA862E bright orange fur
    private static Color cFurHi = Color.FromArgb(255, 252, 168, 80);     // #FCA850 leading highlight
    private static Color cFurSh = Color.FromArgb(255, 200, 88, 24);      // #C85818 trailing shade
    private static Color cFarFur = Color.FromArgb(255, 175, 72, 18);     // #AF4812 far orange
    private static Color cFarFurSh = Color.FromArgb(255, 130, 48, 12);   // #82300C far shade
    private static Color cPaw = Color.FromArgb(255, 253, 248, 238);       // #FDF8EE white mitten
    private static Color cPawSh = Color.FromArgb(255, 235, 215, 195);    // #EBD7C3 cream shade
    private static Color cFarPaw = Color.FromArgb(255, 218, 198, 178);   // #DAC6B2 far white
    private static Color cFarPawSh = Color.FromArgb(255, 185, 160, 140); // #B9A08C far cream shade
    private static Color cBelly = Color.FromArgb(255, 252, 244, 232);    // #FCF4E8 belly white
    private static Color cBellySh = Color.FromArgb(255, 238, 222, 204);  // #EEDECC belly shade

    private static void SetPix(Bitmap bmp, int x, int y, Color c)
    {
        if (x >= 0 && x < bmp.Width && y >= 0 && y < bmp.Height)
        {
            bmp.SetPixel(x, y, c);
        }
    }

    private static void FillDisc(Bitmap bmp, int offX, int cx, int cy, int rx, int ry, Color fill, Color outline)
    {
        for (int dy = -ry; dy <= ry; dy++)
        {
            for (int dx = -rx; dx <= rx; dx++)
            {
                float d = ((float)dx * dx) / (rx * rx) + ((float)dy * dy) / (ry * ry);
                if (d <= 1.0f)
                {
                    bool isEdge = (d > 0.72f);
                    SetPix(bmp, offX + cx + dx, cy + dy, isEdge ? outline : fill);
                }
            }
        }
    }

    private static void DrawSegment(Bitmap bmp, int offX, int x1, int y1, int x2, int y2, int w1, int w2, Color fill, Color hi, Color sh)
    {
        int steps = Math.Max(Math.Abs(x2 - x1), Math.Abs(y2 - y1)) + 1;
        for (int i = 0; i <= steps; i++)
        {
            float t = (float)i / steps;
            int cx = (int)(x1 + t * (x2 - x1));
            int cy = (int)(y1 + t * (y2 - y1));
            int w = (int)(w1 + t * (w2 - w1));
            int half = w / 2;

            for (int dx = -half; dx <= half; dx++)
            {
                bool edge = (dx == -half || dx == half);
                Color c = edge ? cOut : (dx < -half / 3 ? hi : (dx > half / 3 ? sh : fill));
                SetPix(bmp, offX + cx + dx, cy, c);
            }
        }
    }

    public static void RenderPaw(Bitmap bmp, int offX, int cx, int cy, bool isFar)
    {
        Color pCol = isFar ? cFarPaw : cPaw;
        Color pShd = isFar ? cFarPawSh : cPawSh;
        int pw = 14, ph = 8;
        int topY = cy - ph + 1;

        for (int y = topY; y <= cy; y++)
        {
            int rowW = pw;
            if (y == topY) rowW = pw - 4;
            else if (y == topY + 1 || y == cy) rowW = pw - 2;

            int left = cx - rowW / 2;
            for (int x = 0; x < rowW; x++)
            {
                int px = left + x;
                bool isBorder = (x == 0 || x == rowW - 1 || y == topY || y == cy);
                if (isBorder)
                {
                    SetPix(bmp, offX + px, y, cOut);
                }
                else
                {
                    Color fill = (y >= cy - 2 || x >= rowW - 3) ? pShd : pCol;
                    SetPix(bmp, offX + px, y, fill);
                }
            }
        }

        if (!isFar)
        {
            SetPix(bmp, offX + cx - 2, cy - 3, cOut);
            SetPix(bmp, offX + cx - 2, cy - 2, cOut);
            SetPix(bmp, offX + cx - 2, cy - 1, cOut);

            SetPix(bmp, offX + cx + 2, cy - 3, cOut);
            SetPix(bmp, offX + cx + 2, cy - 2, cOut);
            SetPix(bmp, offX + cx + 2, cy - 1, cOut);
        }
    }

    public static void RenderForelegAnatomical(Bitmap bmp, int offX, int sx, int sy, int ex, int ey, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarFur : cFur;
        Color furSh = isFar ? cFarFurSh : cFurSh;
        Color furHi = isFar ? cFarFur : cFurHi;

        FillDisc(bmp, offX, sx, sy, 8, 7, fur, cOut);
        DrawSegment(bmp, offX, sx, sy, ex, ey, 15, 13, fur, furHi, furSh);
        int pawTopY = py - 6;
        DrawSegment(bmp, offX, ex, ey, px, pawTopY, 13, 11, fur, furHi, furSh);
        RenderPaw(bmp, offX, px, py, isFar);
    }

    public static void RenderHindlegAnatomical(Bitmap bmp, int offX, int hx, int hy, int kx, int ky, int hockX, int hockY, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarFur : cFur;
        Color furSh = isFar ? cFarFurSh : cFurSh;
        Color furHi = isFar ? cFarFur : cFurHi;

        FillDisc(bmp, offX, hx, hy, 11, 9, fur, cOut);
        DrawSegment(bmp, offX, hx, hy, kx, ky, 18, 15, fur, furHi, furSh);
        DrawSegment(bmp, offX, kx, ky, hockX, hockY, 15, 12, fur, furHi, furSh);
        int pawTopY = py - 6;
        DrawSegment(bmp, offX, hockX, hockY, px, pawTopY, 12, 10, fur, furHi, furSh);
        RenderPaw(bmp, offX, px, py, isFar);
    }

    // Soft fluffy white underbelly matching idle cat
    public static void RenderFluffyBelly(Bitmap bmp, int offX, int startX, int endX, int baseY, int dip)
    {
        for (int x = startX; x <= endX; x++)
        {
            float norm = (float)(x - startX) / (endX - startX);
            int arc = (int)(Math.Sin(norm * Math.PI) * dip);
            int by = baseY + arc;

            SetPix(bmp, offX + x, by, cOut);
            SetPix(bmp, offX + x, by - 1, cBellySh);
            SetPix(bmp, offX + x, by - 2, cBelly);
            SetPix(bmp, offX + x, by - 3, cBelly);
            SetPix(bmp, offX + x, by - 4, cBelly);
            SetPix(bmp, offX + x, by - 5, cBelly);
            SetPix(bmp, offX + x, by - 6, cFur);
            SetPix(bmp, offX + x, by - 7, cFur);
        }
    }

    public static void Build()
    {
        string sheetPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet.png";
        using (Bitmap sheet = new Bitmap(sheetPath))
        using (Bitmap strip = new Bitmap(160 * 6, 160, PixelFormat.Format32bppArgb))
        {
            using (Graphics g = Graphics.FromImage(strip))
            {
                g.Clear(Color.Transparent);
                for (int f = 0; f < 6; f++)
                {
                    // Copy upper body and flank up to Y=118
                    g.DrawImage(sheet, new Rectangle(f * 160, 0, 160, 118),
                        new Rectangle(f * 160, 160, 160, 118), GraphicsUnit.Pixel);
                }
            }

            // Layer order for natural perspective depth:
            // 1. Far legs
            // 2. Fluffy white underbelly
            // 3. Near legs

            // =========================================================================
            // FRAME 0: Reach / Contact
            // Front near leg reaches forward and strikes ground at Y=148; hind legs trail in air
            // =========================================================================
            int off0 = 0 * 160;
            RenderHindlegAnatomical(strip, off0, 44, 115, 36, 124, 28, 128, 18, 134, true);
            RenderForelegAnatomical(strip, off0, 102, 115, 98, 126, 100, 138, true);
            RenderFluffyBelly(strip, off0, 46, 104, 119, 4);
            RenderHindlegAnatomical(strip, off0, 46, 115, 40, 124, 32, 128, 24, 134, false);
            RenderForelegAnatomical(strip, off0, 104, 115, 110, 128, 116, 148, false);

            // =========================================================================
            // FRAME 1: Compression (Gather)
            // Front legs absorb landing at Y=148; spine arches; hind legs swing forward under belly
            // =========================================================================
            int off1 = 1 * 160;
            RenderHindlegAnatomical(strip, off1, 44, 115, 52, 124, 46, 132, 48, 140, true);
            RenderForelegAnatomical(strip, off1, 104, 115, 102, 128, 110, 148, true);
            RenderFluffyBelly(strip, off1, 46, 104, 119, 5);
            RenderHindlegAnatomical(strip, off1, 46, 115, 58, 124, 52, 130, 56, 136, false);
            RenderForelegAnatomical(strip, off1, 104, 115, 98, 128, 104, 148, false);

            // =========================================================================
            // FRAME 2: Push-Off (Hind Drive)
            // Hind legs plant firmly on baseline Y=148 and launch; front legs push back
            // =========================================================================
            int off2 = 2 * 160;
            RenderForelegAnatomical(strip, off2, 104, 114, 98, 124, 94, 134, true);
            RenderHindlegAnatomical(strip, off2, 44, 114, 50, 124, 46, 134, 48, 148, true);
            RenderFluffyBelly(strip, off2, 46, 104, 120, 4);
            RenderForelegAnatomical(strip, off2, 106, 114, 96, 126, 88, 144, false);
            RenderHindlegAnatomical(strip, off2, 46, 114, 58, 124, 54, 134, 60, 148, false);

            // =========================================================================
            // FRAME 3: Airborne (Lift / Launch)
            // Hind legs have launched; all 4 paws off ground; body rising forward
            // =========================================================================
            int off3 = 3 * 160;
            RenderHindlegAnatomical(strip, off3, 44, 112, 38, 122, 30, 128, 22, 140, true);
            RenderForelegAnatomical(strip, off3, 104, 112, 106, 122, 110, 134, true);
            RenderFluffyBelly(strip, off3, 46, 104, 119, 4);
            RenderHindlegAnatomical(strip, off3, 46, 112, 42, 122, 36, 128, 28, 142, false);
            RenderForelegAnatomical(strip, off3, 106, 112, 112, 124, 118, 134, false);

            // =========================================================================
            // FRAME 4: Extension (Apex Flight)
            // Maximum elongation in flight; paws extended forward and backward high in air
            // =========================================================================
            int off4 = 4 * 160;
            RenderHindlegAnatomical(strip, off4, 44, 112, 34, 120, 24, 122, 16, 124, true);
            RenderForelegAnatomical(strip, off4, 104, 112, 112, 120, 120, 126, true);
            RenderFluffyBelly(strip, off4, 46, 104, 119, 3);
            RenderHindlegAnatomical(strip, off4, 44, 112, 36, 120, 28, 122, 22, 126, false);
            RenderForelegAnatomical(strip, off4, 106, 112, 116, 120, 126, 128, false);

            // =========================================================================
            // FRAME 5: Landing (Descent / Touchdown Prep)
            // Front paws extending downward; hind legs folding forward; ready for Frame 0!
            // =========================================================================
            int off5 = 5 * 160;
            RenderHindlegAnatomical(strip, off5, 44, 114, 44, 124, 40, 128, 36, 134, true);
            RenderForelegAnatomical(strip, off5, 104, 114, 104, 126, 108, 140, true);
            RenderFluffyBelly(strip, off5, 46, 104, 119, 4);
            RenderHindlegAnatomical(strip, off5, 46, 114, 46, 124, 38, 128, 30, 132, false);
            RenderForelegAnatomical(strip, off5, 106, 114, 110, 126, 116, 144, false);

            string outPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\test-anatomical-run-v2.png";
            strip.Save(outPath, ImageFormat.Png);
            Console.WriteLine("Saved " + outPath);
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[PerfectAnatomicalRunBuilder]::Build()
