import io from 'socket.io-client';

export const socket = io.connect('http://localhost:4000');

export function emitJoinRoom(branchId) {
  if (!branchId) return;

  socket.emit('join-room', branchId);
}

export function emitLeaveRoom(branchId) {
  if (!branchId) return;

  socket.emit('leave-room', branchId);
}

export function emitTyping(branchId, value) {
  if (!branchId) return;

  socket.emit('sharing-note-typed', branchId, value);
}

export function listenForTyping(setValue) {
  socket.on('sharing-note-typed', value => setValue(value));
}
