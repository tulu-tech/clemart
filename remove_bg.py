from PIL import Image

def remove_background(input_path, output_path, tolerance=25):
    img = Image.open(input_path).convert("RGBA")
    pixels = img.load()
    width, height = img.size

    # List of seed points for outer background (top-left, top-right, bottom-left, bottom-right)
    seeds = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    
    # We want to make everything connected to keys transparent
    # using a simple BFS flood fill
    
    visited = set()
    to_visit = []
    for s in seeds:
        to_visit.append(s)
        visited.add(s)

    target_color = pixels[0, 0] # Assume top-left is background color
    
    def color_distance(c1, c2):
        return sum(abs(a - b) for a, b in zip(c1[:3], c2[:3]))
    
    while len(to_visit) > 0:
        x, y = to_visit.pop(0)
        current_color = pixels[x, y]
        
        if color_distance(current_color, target_color) <= tolerance:
            # Make transparent
            pixels[x, y] = (0, 0, 0, 0)
            
            # Add neighbors
            for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    to_visit.append((nx, ny))

    img.save(output_path, "PNG")

remove_background("images/logo.png", "images/logo_transparent.png")
print("Done!")
