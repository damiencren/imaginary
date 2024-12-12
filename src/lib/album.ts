import axios from 'axios';

export const addAlbum = async (albumName: string, collectionName: string) => {
    try {
        const response = (await axios.post('/api/album/add', { albumName, collectionName }));
        return response.data;
    } catch (error) {
        console.error('Error adding album:', error);
        return { success: false };
    }
};