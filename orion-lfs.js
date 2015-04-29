orion.config.add('UPLOAD_PATH', 'filesystem');

var upload_path = orion.config.get('UPLOAD_PATH') || 'files';

var base = "";

if (Meteor.isServer) {
  base = process.env.PWD;
}

Files = new FS.Collection("files", {
  stores: [
    new FS.Store.FileSystem("files", { path: base + '/public/' + upload_path })
  ],
  filter: {
    maxSize: 1000000,
    allow: {
      contentTypes: ['image/*']
    }
  }
});

Files.deny({
  insert: function(){
    return false;
  },
  update: function(){
    return false;
  },
  remove: function(){
    return false;
  },
  download: function(){
    return false;
  }
});

Files.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  },
  download: function(){
    return true;
  }
});

if (Meteor.isClient) {
  orion.filesystem.providerUpload = function(options, success, failure) {

    // Handle multiple files upload
    _.each(options.fileList, function(file) {
  
      // If you want to upload different types of files to different FS.Collection, 
      // do extension check first
      // var fileName = file.name;
      // var isImage = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(fileName);
      // var isTorrent = (/\.(torrent)$/i).test(fileName);
  
      // Use FS.Collection (Files) to upload the file
      Files.insert(file, function(err, file) {
        if (err) {
          console.log('error', err);
        } else {
          // recreate upload file pattern
          var fileName = file.collectionName + '-' + file._id + '-' + file.original.name;
          var fileUrl = Meteor.absoluteUrl() + upload_path + '/' + fileName;
  
          console.log(fileUrl);
  
          var meta = {
            cfs_id : file._id,
            ext    : file.extension()
          };
          success(fileUrl, meta);
        }
  
      })
    });
  }

  orion.filesystem.providerRemove = function(file, success, failure) {
  
    var cfs_id = file.meta.cfs_id;
  
    // remove record in cfs and the related file in directory
    // Here the Files.remove() requires cfs_id, not a FS.file
    Files.remove(cfs_id, function(err, file) {
      if (err) {
        console.log('error', err);
      } else {
        console.log('remove success');
        success();  // remove record in orion
      };
    });
  }
}