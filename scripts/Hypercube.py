import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.widgets import Slider
from mpl_toolkits.mplot3d import Axes3D

# Define the vertices of a tesseract
def create_hypercube():
    from itertools import product
    vertices = np.array(list(product([-1, 1], repeat=4)))
    return vertices

# Define the edges connecting the vertices
def connect_edges(vertices):
    edges = []
    for i in range(len(vertices)):
        for j in range(i+1, len(vertices)):
            # Two vertices are connected if they differ by exactly one coordinate
            if np.sum(vertices[i] != vertices[j]) == 1:
                edges.append((i, j))
    return edges

# Rotation matrix in 4D
def rotation_matrix_4d(theta, axis1, axis2):
    rm = np.identity(4)
    c, s = np.cos(theta), np.sin(theta)
    rm[axis1, axis1] = c
    rm[axis1, axis2] = -s
    rm[axis2, axis1] = s
    rm[axis2, axis2] = c
    return rm

# Project from 4D to 3D using perspective projection
def project_to_3d(vertices4d, distance=5):
    # Perspective projection onto 3D space
    w = distance / (distance - vertices4d[:, 3])
    vertices3d = vertices4d[:, :3] * w[:, np.newaxis]
    return vertices3d

# Function to set equal aspect ratio in 3D plot
def set_axes_equal(ax):
    '''Make axes of 3D plot have equal scale.'''
    x_limits = ax.get_xlim3d()
    y_limits = ax.get_ylim3d()
    z_limits = ax.get_zlim3d()

    x_range = np.abs(x_limits[1] - x_limits[0])
    x_middle = np.mean(x_limits)
    y_range = np.abs(y_limits[1] - y_limits[0])
    y_middle = np.mean(y_limits)
    z_range = np.abs(z_limits[1] - z_limits[0])
    z_middle = np.mean(z_limits)

    plot_radius = 0.5 * max([x_range, y_range, z_range])

    ax.set_xlim3d([x_middle - plot_radius, x_middle + plot_radius])
    ax.set_ylim3d([y_middle - plot_radius, y_middle + plot_radius])
    ax.set_zlim3d([z_middle - plot_radius, z_middle + plot_radius])

# Adjust grid line colors and styles using appropriate methods
def set_grid_lines(ax):
    # Set grid lines to be light and subtle
    grid_color = (1, 1, 1, 0.1)
    ax.xaxis._axinfo["grid"]['color'] = grid_color
    ax.yaxis._axinfo["grid"]['color'] = grid_color
    ax.zaxis._axinfo["grid"]['color'] = grid_color

# Create the tesseract
vertices = create_hypercube()
edges = connect_edges(vertices)

# Set up the plot
fig = plt.figure(figsize=(8, 8))
ax = fig.add_subplot(111, projection='3d')
fig.patch.set_facecolor('black')  # Set background color
ax.set_facecolor('black')
ax.grid(True)

# Hide axes tick labels
ax.set_xticks([])
ax.set_yticks([])
ax.set_zticks([])

# Initialize rotation speeds
speed1 = 0.5  # Speed factor for rotation around axes 0 and 1
speed2 = 0.5  # Speed factor for rotation around axes 2 and 3
speed3 = 0.5  # Speed factor for rotation around axes 0 and 2

# Adjust the main plot to make room for sliders
plt.subplots_adjust(left=0.1, bottom=0.35)

# Slider Axes with black background
ax_speed1 = plt.axes([0.1, 0.25, 0.8, 0.03], facecolor='black')
ax_speed2 = plt.axes([0.1, 0.20, 0.8, 0.03], facecolor='black')
ax_speed3 = plt.axes([0.1, 0.15, 0.8, 0.03], facecolor='black')

# Create Sliders with white track and red handles
slider_color = 'white'
handle_color = 'red'

speed_slider1 = Slider(ax_speed1, 'XY', -5.0, 5.0, valinit=speed1, color=slider_color)
speed_slider2 = Slider(ax_speed2, 'WZ', -5.0, 5.0, valinit=speed2, color=slider_color)
speed_slider3 = Slider(ax_speed3, 'XZ', -5.0, 5.0, valinit=speed3, color=slider_color)

# Customize slider labels, value text, and handle colors
for slider in [speed_slider1, speed_slider2, speed_slider3]:
    slider.label.set_color('white')
    slider.valtext.set_color('white')
    slider.poly.set_color(slider_color)
    slider.poly.set_edgecolor(handle_color)


# Update function for animation
def update(frame):
    
    
    ax.clear()
    fig.patch.set_facecolor('black')
    ax.set_facecolor('black')
    ax.grid(True)
    set_grid_lines(ax)
    # Hide axes tick labels
    ax.set_xticks([])
    ax.set_yticks([])
    ax.set_zticks([])
    
    # Rotation parameters
    theta = np.radians(frame)
    # Use the speed variables to control rotation speeds
    rotation = (rotation_matrix_4d(theta * speed1, 0, 1) @
                rotation_matrix_4d(theta * speed2, 2, 3) @
                rotation_matrix_4d(theta * speed3, 0, 2))
    rotated_vertices = vertices @ rotation.T

    # Project to 3D
    vertices3d = project_to_3d(rotated_vertices, distance=5)

    # Adjust axes limits to keep cube in frame
    max_range = np.max(np.abs(vertices3d)) * 1.2
    ax.set_xlim3d([-max_range, max_range])
    ax.set_ylim3d([-max_range, max_range])
    ax.set_zlim3d([-max_range, max_range])
    set_axes_equal(ax)  # Ensure equal scaling

    # Set viewing angle
    ax.view_init(elev=30, azim=30)

    # Draw edges
    for edge in edges:
        points = vertices3d[list(edge)]
        # Color edges based on average position to add depth effect
        avg = np.mean(points[:, 2])
        color = plt.cm.plasma((avg + max_range) / (2 * max_range))
        ax.plot3D(points[:, 0], points[:, 1], points[:, 2], color=color, linewidth=2)

    # Draw vertices
    ax.scatter3D(vertices3d[:, 0], vertices3d[:, 1], vertices3d[:, 2],
                 color='white', s=30)

# Update function when sliders change
def update_speed(val):
    global speed1, speed2, speed3
    speed1 = speed_slider1.val
    speed2 = speed_slider2.val
    speed3 = speed_slider3.val

# Connect sliders to the update_speed function
speed_slider1.on_changed(update_speed)
speed_slider2.on_changed(update_speed)
speed_slider3.on_changed(update_speed)

# Create animation
anim = FuncAnimation(fig, update, frames=np.linspace(0, 360, num=240), interval=20)

# Display the animation
plt.show()