import Message from "./message.model.js"
import User from '../usuario/usuario.model.js';
import { getReceiverSocketId } from "../Socket/userState.js";
import { getIO } from "../Socket/io.js";

export const getUsersConnected = async (req, res) => {
    try {
        const looguedUser = req.user.uid
        const filter = await User.find(
            {
                uid: {
                    $ne: looguedUser
                }
            }
        ).select('-password')
        res.status(200).send(
            {
                message: 'Connected users fetched successfully',
                users: filter
            }
        )
    } catch (e) {
        console.error('Error fetching connected users:', e);
        res.status(500).send(
            {
                error: 'Internal Server Error',
                message: 'Failed to fetch connected users'
            }
        )
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { content } = req.body 
        const { id: recipient } = req.params
        const sender = req.user.uid
        const message = new Message({
            sender,
            recipient,
            content
        })
        await message.save()

        const receiverSocketId = getReceiverSocketId(recipient);
        if (receiverSocketId) {
            const socket = getIO().sockets.sockets.get(receiverSocketId);
            if (socket) {
                socket.emit("newMessage", message);
                console.log('Message sent to receiver', message);
                
            }
        }

        res.status(200).send(
            {
                success: true,
                message: 'Message sent successfully',
                message
            }
        )
    } catch (e) {
        console.error('Error sending message:', e);
            res.status(500).send(
                {
                    error: 'Internal Server Error',
                    message: 'Failed to send message'
                }
            )
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const looguedUser = req.user.uid
        const messages = await Message.find({
            $or: [
                { sender: looguedUser, recipient: userToChatId },
                { sender: userToChatId, recipient: looguedUser }
            ]
        })
        res.status(200).send(
            {
                success: true,
                message: 'Messages fetched successfully',
                messages
            }
        )
    } catch (e) {
        console.error('Error fetching messages:', e);
        res.status(500).send(
            {
                success: false,
                message: 'Failed to fetch messages'
            }
        )
    }
}