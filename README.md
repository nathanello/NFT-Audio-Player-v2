# NFT-Audio-Player-v2
A template for minting single audio tracks.

Here's an example of what they player looks like >> https://imgur.com/VzyIGzY

The following files will need to be replaced;
1. M_Background_02.gif (optional background)
2. M_Treat_Me_Right_ReMaster.mp3 (audio track, mp3 preferred since it's lighter weight than .wav but .wav will work too)
3. Test_Cover_1.png (background image)
4. Test_Cover_2.png (spinning record image)

In the index.html file you'll need to replacee these files on lines 8 + 15 + 29 + 46.

To use the optional background image remove the /* & */ characters found on line 8.

If you're uploading to Pinata to mint this NFT please upload all files into a /src directory on Pinata.

If you're minting on GameStop's marketplace, zip all of these files and then upload the .zip (you will need interactive NFT minting privelages enabled on your creator account first).

I've also included a metadata.json file example in this repo, do NOT upload this within the same folder (on Pinata) or within your .zip (on GameStop's marketplace). You can adjust the value on line 7 in the metadata.json file from 0-10, this is the royalty you'll collect on secondary market sales (this is only applicapble if you're minting outside of GameStop's marketplace).
