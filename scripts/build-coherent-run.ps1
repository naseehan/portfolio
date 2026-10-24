Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class CoherentRunGenerator
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

    public static void RenderForeleg(Bitmap bmp, int offX, int sx, int sy, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarFur : cFur;
        Color furSh = isFar ? cFarFurSh : cFurSh;
        Color furHi = isFar ? cFarFur : cFurHi;

        FillDisc(bmp, offX, sx, sy, 8, 7, fur, cOut);

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

        RenderPaw(bmp, offX, px, py, isFar);
    }

    public static void RenderHindleg(Bitmap bmp, int offX, int hx, int hy, int kx, int ky, int px, int py, bool isFar)
    {
        Color fur = isFar ? cFarFur : cFur;
        Color furSh = isFar ? cFarFurSh : cFurSh;
        Color furHi = isFar ? cFarFur : cFurHi;

        FillDisc(bmp, offX, hx, hy, 10, 8, fur, cOut);

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

        RenderPaw(bmp, offX, px, py, isFar);
    }

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

            // Frame 0: Reach / Contact
            // Front paws reach forward and strike ground baseline at Y=148; hind legs trail in air
            int off0 = 0 * 160;
            RenderHindleg(strip, off0, 46, 114, 32, 126, 18, 132, true);  // FH trailing
            RenderForeleg(strip, off0, 102, 114, 102, 140, true);         // FF trailing
            RenderBelly(strip, off0, 44, 106, 120, 4);
            RenderHindleg(strip, off0, 46, 114, 36, 128, 24, 134, false); // NH trailing
            RenderForeleg(strip, off0, 104, 114, 116, 148, false);        // NF forward strike on baseline!

            // Frame 1: Compression (Gather)
            // Front paws absorb landing; spine flexes; hind legs gather under belly
            int off1 = 1 * 160;
            RenderHindleg(strip, off1, 46, 115, 48, 126, 48, 138, true);  // FH gathered
            RenderForeleg(strip, off1, 104, 115, 110, 148, true);         // FF planted beside NF
            RenderBelly(strip, off1, 44, 106, 120, 5);
            RenderHindleg(strip, off1, 46, 115, 56, 126, 58, 134, false); // NH tucked forward under belly
            RenderForeleg(strip, off1, 104, 115, 104, 148, false);        // NF planted weight-bearing!

            // Frame 2: Push-off (Hind Launch)
            // Hind legs plant on baseline and drive forward; front legs push back
            int off2 = 2 * 160;
            RenderForeleg(strip, off2, 104, 114, 96, 136, true);          // FF folding under chest
            RenderHindleg(strip, off2, 46, 114, 48, 132, 50, 148, true);  // FH planted driving on baseline!
            RenderBelly(strip, off2, 44, 106, 121, 4);
            RenderForeleg(strip, off2, 106, 114, 88, 144, false);         // NF pushing backward
            RenderHindleg(strip, off2, 46, 114, 56, 132, 62, 148, false); // NH planted driving on baseline!

            // Frame 3: Airborne (Lift / Launch)
            // All 4 paws in the air; front legs reaching forward, hind legs driving back
            int off3 = 3 * 160;
            RenderHindleg(strip, off3, 46, 112, 34, 128, 22, 140, true);  // FH pushing back in air
            RenderForeleg(strip, off3, 104, 112, 110, 136, true);         // FF reaching forward in air
            RenderBelly(strip, off3, 44, 106, 120, 4);
            RenderHindleg(strip, off3, 46, 112, 40, 128, 28, 142, false); // NH pushing back in air
            RenderForeleg(strip, off3, 106, 112, 118, 134, false);        // NF reaching forward in air

            // Frame 4: Extension (Apex Leap / Full Flight)
            // Maximum elongation in flight; all paws high above ground line
            int off4 = 4 * 160;
            RenderHindleg(strip, off4, 44, 112, 28, 122, 16, 124, true);  // FH fully extended back
            RenderForeleg(strip, off4, 104, 112, 118, 126, true);         // FF fully extended forward
            RenderBelly(strip, off4, 44, 106, 120, 3);
            RenderHindleg(strip, off4, 44, 112, 30, 124, 20, 126, false); // NH fully extended back
            RenderForeleg(strip, off4, 106, 112, 126, 128, false);        // NF fully extended forward

            // Frame 5: Landing (Descent / Touchdown Prep)
            // Front paws angling down to strike; hind legs folding forward; ready for Frame 0!
            int off5 = 5 * 160;
            RenderHindleg(strip, off5, 46, 114, 42, 126, 38, 134, true);  // FH folding forward
            RenderForeleg(strip, off5, 104, 114, 108, 140, true);         // FF descending
            RenderBelly(strip, off5, 44, 106, 120, 4);
            RenderHindleg(strip, off5, 46, 114, 40, 126, 32, 132, false); // NH folding forward
            RenderForeleg(strip, off5, 106, 114, 116, 144, false);        // NF descending to strike at 148 in Frame 0!

            string outPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\test-coherent-run.png";
            strip.Save(outPath, ImageFormat.Png);
            Console.WriteLine("Saved " + outPath);
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[CoherentRunGenerator]::Build()
