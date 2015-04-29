# Local Storage Provider for Orion Filesystem

### Notice
If you want to use a community package, please check this [lc3t35:orion-filesystem-local](https://github.com/lc3t35/orion-filesystem-local). This repo is for customization and experiment needs. Not guarantee long-time support.

### Features

* Upload multiple files (images)
* Delete file both in orionFiles and cfs.files.filerecord and on local server 

### Customization

This is not an official package or a general solution. Because the need for file uploads vary so much, the package only shows the basics to upload/delete files for orionjs based on CollectionFS.

Create your own package based on this one!

```
meteor create --package YourProj:orion-lfs
```
or use git submodule and modify this one.
```
meteor add loongmxbt:orion-lfs
```

### Tradeoffs

If using different FS.Collection, we need to write different remove functions in `orion.filesystem.providerRemove`.

For example:
```
Files.remove(cfs_id)
Images.remove(cfs_id)
```

So the easiest way is to make only one FS.Collection `Files`.

### Issues (Help)
1. How to use different stores for different types of files?
2. Resource interpreted as Image but transferred with MIME type text/html, 
and after page refreshes, the image then shows.

### Docs
[CollectionFS](https://github.com/CollectionFS/Meteor-CollectionFS)