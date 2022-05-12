from PIL import Image

image_number  = 31

for image in range(image_number):
    path = f"./uploads/room_photos/{image+1}.webp"
    img = Image.open(path)
    print(img)
    # img.save(path, "jpeg")