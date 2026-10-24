Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public class PolishedPixelRunBuilder
{
    // Palette exactly matched to existing cat art
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

    // Fills a rounded pixel disc
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

    // Draws a chubby, authentic pixel-art mitten paw (width 14, height 8)
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

        // Two vertical toe separation notches
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

    // Draws a chubby, anatomically curved foreleg
    public static void RenderForeleg(Bitmap bmp, int offX, int sx, int sy, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarFur : cFur;
        Color furSh = isFar ? cFarFurSh : cFurSh;
        Color furHi = isFar ? cFarFur : cFurHi;

        // 1. Shoulder rounded mass
        FillDisc(bmp, offX, sx, sy, 8, 7, fur, cOut);

        // 2. Forearm limb stroke with natural thickness (14 tapering to 11)
        int steps = Math.Max(Math.Abs(px - sx), Math.Abs((py - 6) - sy)) + 1;
        for (int i = 0; i <= steps; i++)
        {
            float t = (float)i / steps;
            int cx = (int)(sx + t * (px - sx));
            int cy = (int)(sy + t * ((py - 6) - sy));
            int w = (int)(15 - t * 4f);
            int half = w / 2;

            for (int dx = -half; dx <= half; dx++)
            {
                bool edge = (dx == -half || dx == half);
                Color c = edge ? cOut : (!isFar && dx < -half / 3 ? furHi : (dx > half / 3 ? furSh : fur));
                SetPix(bmp, offX + cx + dx, cy, c);
            }
        }

        // 3. Paw
        RenderPaw(bmp, offX, px, py, isFar);
    }

    // Draws a broad, chubby hindleg with muscular thigh, backward hock, and paw
    public static void RenderHindleg(Bitmap bmp, int offX, int hx, int hy, int kx, int ky, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarFur : cFur;
        Color furSh = isFar ? cFarFurSh : cFurSh;
        Color furHi = isFar ? cFarFur : cFurHi;

        // 1. Broad rounded thigh mass
        FillDisc(bmp, offX, hx, hy, 10, 8, fur, cOut);

        // 2. Upper thigh stroke to hock (width 18 tapering to 14)
        int steps1 = Math.Max(Math.Abs(kx - hx), Math.Abs(ky - hy)) + 1;
        for (int i = 0; i <= steps1; i++)
        {
            float t = (float)i / steps1;
            int cx = (int)(hx + t * (kx - hx));
            int cy = (int)(hy + t * (ky - hy));
            int w = (int)(18 - t * 4f);
            int half = w / 2;

            for (int dx = -half; dx <= half; dx++)
            {
                bool edge = (dx == -half || dx == half);
                Color c = edge ? cOut : (!isFar && dx < -half / 3 ? furHi : (dx > half / 3 ? furSh : fur));
                SetPix(bmp, offX + cx + dx, cy, c);
            }
        }

        // 3. Lower metatarsus from hock to paw (width 13 tapering to 11)
        int pawTopY = py - 6;
        int steps2 = Math.Max(Math.Abs(px - kx), Math.Abs(pawTopY - ky)) + 1;
        for (int i = 0; i <= steps2; i++)
        {
            float t = (float)i / steps2;
            int cx = (int)(kx + t * (px - kx));
            int cy = (int)(ky + t * (pawTopY - ky));
            int w = (int)(14 - t * 3f);
            int half = w / 2;

            for (int dx = -half; dx <= half; dx++)
            {
                bool edge = (dx == -half || dx == half);
                Color c = edge ? cOut : (!isFar && dx < -half / 3 ? furHi : furSh);
                SetPix(bmp, offX + cx + dx, cy, c);
            }
        }

        // 4. Paw
        RenderPaw(bmp, offX, px, py, isFar);
    }

    // Draws a soft, chubby kitten underbelly
    public static void RenderBelly(Bitmap bmp, int offX, int startX, int endX, int baseY, int dip)
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
            SetPix(bmp, offX + x, by - 5, cFur);
            SetPix(bmp, offX + x, by - 6, cFur);
            SetPix(bmp, offX + x, by - 7, cFur);
            SetPix(bmp, offX + x, by - 8, cFur);
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
                    // Copy upper body (0..116)
                    g.DrawImage(sheet, new Rectangle(f * 160, 0, 160, 116),
                        new Rectangle(f * 160, 160, 160, 116), GraphicsUnit.Pixel);
                }
            }

            // Frame 0: Near Foreleg Stride (NF contact at Y=148, FH contact at Y=148)
            int off0 = 0 * 160;
            RenderHindleg(strip, off0, 46, 115, 34, 126, 24, 136, true);  // FH push-off
            RenderForeleg(strip, off0, 104, 115, 92, 136, true);          // FF lifting recovery
            RenderBelly(strip, off0, 42, 110, 122, 5);
            RenderHindleg(strip, off0, 46, 115, 58, 128, 64, 148, false); // NH forward strike
            RenderForeleg(strip, off0, 106, 115, 114, 148, false);        // NF lead strike

            // Frame 1: Weight Bearing & Compression (NF & FH planted at Y=148)
            int off1 = 1 * 160;
            RenderHindleg(strip, off1, 46, 111, 28, 120, 18, 126, true);  // FH lifted high back
            RenderForeleg(strip, off1, 104, 111, 100, 128, true);         // FF flexed forward
            RenderBelly(strip, off1, 42, 110, 120, 6);
            RenderHindleg(strip, off1, 44, 111, 48, 126, 52, 148, false); // NH planted driving
            RenderForeleg(strip, off1, 108, 111, 106, 148, false);        // NF planted weight-bearing

            // Frame 2: Push-Off Drive & Airborne Transition 1
            int off2 = 2 * 160;
            RenderHindleg(strip, off2, 44, 115, 40, 128, 36, 144, true);  // FH push-off
            RenderForeleg(strip, off2, 106, 115, 114, 136, true);         // FF reaching forward
            RenderBelly(strip, off2, 42, 110, 122, 5);
            RenderHindleg(strip, off2, 48, 115, 42, 124, 46, 134, false); // NH swinging forward
            RenderForeleg(strip, off2, 104, 115, 90, 144, false);         // NF pushing back

            // Frame 3: Far Foreleg Stride (FF contact at Y=148, NH contact at Y=148)
            int off3 = 3 * 160;
            RenderForeleg(strip, off3, 106, 113, 114, 148, true);         // FF lead strike
            RenderHindleg(strip, off3, 46, 113, 58, 128, 64, 148, true);  // FH forward strike
            RenderBelly(strip, off3, 42, 110, 122, 5);
            RenderHindleg(strip, off3, 46, 113, 34, 126, 24, 136, false); // NH push-off
            RenderForeleg(strip, off3, 104, 113, 92, 136, false);         // NF lifting recovery

            // Frame 4: Weight Bearing & Compression (FF & NH planted at Y=148)
            int off4 = 4 * 160;
            RenderForeleg(strip, off4, 108, 115, 106, 148, true);         // FF planted weight-bearing
            RenderHindleg(strip, off4, 44, 115, 48, 126, 52, 148, true);  // FH planted driving
            RenderBelly(strip, off4, 42, 110, 122, 6);
            RenderHindleg(strip, off4, 46, 115, 28, 120, 18, 126, false); // NH lifted high back
            RenderForeleg(strip, off4, 104, 115, 100, 128, false);        // NF flexed forward

            // Frame 5: Push-Off Drive & Airborne Transition 2
            int off5 = 5 * 160;
            RenderForeleg(strip, off5, 104, 110, 90, 142, true);          // FF pushing back
            RenderHindleg(strip, off5, 48, 110, 42, 122, 46, 130, true);  // FH swinging forward
            RenderBelly(strip, off5, 42, 110, 120, 5);
            RenderHindleg(strip, off5, 44, 110, 40, 126, 36, 142, false); // NH push-off
            RenderForeleg(strip, off5, 106, 110, 114, 134, false);        // NF reaching forward to strike in Frame 0!

            string outPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\test-run-strip-v5.png";
            strip.Save(outPath, ImageFormat.Png);
            Console.WriteLine("Saved test-run-strip-v5.png");
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[PolishedPixelRunBuilder]::Build()
