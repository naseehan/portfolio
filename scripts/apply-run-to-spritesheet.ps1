Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class UpdateRunRowV2
{
    public static void Apply()
    {
        string sheetPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet.png";
        string row1Path = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\test-anatomical-run-v2.png";

        using (Bitmap sheet = new Bitmap(sheetPath))
        using (Bitmap row1 = new Bitmap(row1Path))
        {
            // Clear only Row 1 (Y = 160 to 320)
            for (int y = 160; y < 320; y++)
            {
                for (int x = 0; x < 960; x++)
                {
                    sheet.SetPixel(x, y, Color.Transparent);
                }
            }

            // Draw clean anatomical row 1 into sheet at Y = 160
            using (Graphics g = Graphics.FromImage(sheet))
            {
                g.DrawImage(row1, new Rectangle(0, 160, 960, 160), new Rectangle(0, 0, 960, 160), GraphicsUnit.Pixel);
            }

            string tempOut = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet-temp.png";
            sheet.Save(tempOut, ImageFormat.Png);
            Console.WriteLine("Saved updated sheet to temp");
        }

        string finalPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet.png";
        string tempPath = @"C:\Users\Naseeh\Downloads\portfolio-redesigned\portfolio\public\images\pixel-cat-v2-spritesheet-temp.png";
        System.IO.File.Copy(tempPath, finalPath, true);
        System.IO.File.Delete(tempPath);
        Console.WriteLine("Successfully updated Row 1 with anatomical running gait!");
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

[UpdateRunRowV2]::Apply()
