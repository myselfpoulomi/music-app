// usercontroller.js

/* ====== User Authentication ====== */
function registerSendOtp(req, res) {}
function registerVerify(req, res) {}
function loginSendOtp(req, res) {}
function loginVerifyOtp(req, res) {}

/* ====== User Profile ====== */
function updateName(req, res) {}
function getUser(req, res) {}

/* ====== Playlist Management ====== */
function createPlaylist(req, res) {}
function addSongToPlaylist(req, res) {}
function removeSongFromPlaylist(req, res) {}
function getAllPlaylists(req, res) {}
function getPlaylist(req, res) {}
function updatePlaylistName(req, res) {}
function deletePlaylist(req, res) {}

export {
  /* User Authentication */
  registerSendOtp,
  registerVerify,
  loginSendOtp,
  loginVerifyOtp,
  /* User Profile */
  updateName,
  getUser,
  /* Playlist Management */
  createPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  getAllPlaylists,
  getPlaylist,
  updatePlaylistName,
  deletePlaylist
};
