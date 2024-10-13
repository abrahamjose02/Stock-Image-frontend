import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axiosInstance from '../axios/axiosInstance';
import { Button } from '../components/ui/button';
import { Edit2, Trash2, X, Move, Save } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '../components/Navbar'; // Import the Navbar component
import useTokenRefresh from '../hooks/useTokenRefresh';

interface Image {
  _id: string;
  title: string;
  imageUrl: string;
  order: number;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<Image | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  useTokenRefresh();

  const fetchImages = async () => {
    try {
      const response = await axiosInstance.get('/image');
      const sortedImages = response.data.images.sort((a: any, b: any) => a.order - b.order);
      setImages(sortedImages);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Failed to fetch images. Please try again later.');
    }
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return; 

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    const updatedImages = reorderedImages.map((image, index) => ({
      ...image,
      order: index + 1,
    }));

    setImages(updatedImages);
    setHasChanges(true);
  };

  const handleSaveOrder = async () => {
    if (!hasChanges) return; // If no changes, do not save
    try {
      await axiosInstance.put('/image/reorder', {
        imageIds: images.map(img => ({ id: img._id, order: img.order })),
      });
      setHasChanges(false);
      toast.success('New order saved successfully!');
    } catch (error) {
      console.error('Error saving new order:', error);
      toast.error('Failed to save the new order. Please try again.');
    }
  };

  const handleEdit = (image: Image) => {
    setEditingId(image._id);
    setEditTitle(image.title);
    setError(null);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    if (editTitle.trim() === '') {
      setError('Title cannot be empty');
      return;
    }

    try {
      await axiosInstance.put(`/image/${editingId}/title`, { title: editTitle });
      setImages(images.map(img => (img._id === editingId ? { ...img, title: editTitle } : img)));
      setEditingId(null);
      setError(null);
      toast.success('Image title updated successfully!');
    } catch (error) {
      console.error('Error updating image:', error);
      toast.error('Failed to update image title. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axiosInstance.delete(`/image/${id}`);
      setImages(images.filter(img => img._id !== id));
      toast.success('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image. Please try again.');
    }
  };

  const handleImageClick = (image: Image) => {
    setPreviewImage(image);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

  return (
    <div className="bg-gray-500 min-h-screen"> 
      <Navbar /> 
      <div className="container mx-auto p-4">
        

        <h1 className="text-4xl font-bold mb-6 text-center text-white">Image Gallery</h1>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="gallery">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {images.map((image, index) => (
                  <Draggable key={image._id} draggableId={image._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="relative bg-gray-900 p-4 rounded-lg shadow-lg transition duration-300 hover:shadow-xl" // Background for each image card
                      >
                        <div
                          {...provided.dragHandleProps}
                          className="absolute top-2 right-2 cursor-pointer p-2 text-gray-600"
                        >
                          <Move size={24} />
                        </div>

                        <img
                          src={image.imageUrl}
                          alt={image.title}
                          className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
                          onClick={() => handleImageClick(image)}
                        />

                        {editingId === image._id ? (
                          <div className="mt-2">
                            <input
                              type="text"
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="w-full p-2 border rounded mb-2"
                            />
                            {error && <p className="text-red-500 mb-2">{error}</p>}
                            <Button onClick={handleSaveEdit} className="w-full">Save</Button>
                          </div>
                        ) : (
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-lg font-semibold text-white">{image.title}</span>
                            <div>
                              <Button onClick={() => handleEdit(image)} className="mr-2 p-2" variant="outline">
                                <Edit2 size={16} />
                              </Button>
                              <Button onClick={() => handleDelete(image._id)} variant="outline" className="p-2">
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {hasChanges && (
          <div className="mt-6 text-center">
            <Button
              onClick={handleSaveOrder}
              className="bg-blue-500 text-white px-6 py-2 rounded-md flex items-center justify-center"
            >
              <Save size={20} className="mr-2" />
              Save New Order
            </Button>
          </div>
        )}

        {previewImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{previewImage.title}</h2>
                <Button onClick={closePreview} variant="ghost">
                  <X size={24} />
                </Button>
              </div>
              <img src={previewImage.imageUrl} alt={previewImage.title} className="max-w-full h-auto" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
