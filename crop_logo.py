from PIL import Image, ImageChops
import os

def crop_transparent_or_white(image_path):
    try:
        img = Image.open(image_path)
        img = img.convert("RGBA")
        
        # Create a background image to find difference
        bg = Image.new("RGBA", img.size, (255, 255, 255, 0))
        # But wait, we want to crop both white and transparent.
        # Let's crop by finding non-white and non-transparent pixels.
        
        # We can just get the bounding box of the alpha channel if it's transparent padding.
        # Let's try bounding box of alpha first.
        bbox = img.getbbox()
        
        if bbox:
            img = img.crop(bbox)
        
        # If the image was white background, we need to make white transparent first
        datas = img.getdata()
        newData = []
        for item in datas:
            # Change white to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
                
        img.putdata(newData)
        
        # Crop again after making white transparent
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
            
        img.save(image_path, "PNG")
        print("Cropped successfully!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    # You can change the path below to crop different logos
    # To crop the new Safe uR Fin logo, uncomment the line below:
    # crop_transparent_or_white("d:/Red Cat Website/images/safe-ur-fin-logo.png")
    
    crop_transparent_or_white("d:/Red Cat Website/images/logo.png")
