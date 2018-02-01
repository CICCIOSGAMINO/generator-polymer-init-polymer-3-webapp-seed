#!/bin/bash
# get in all svg file and create the 8 png webapp png files 
for i in *.[Ss][Vv][Gg];do

# create the icon 
inkscape -z -e 32.png -w 32 -h 32 $i
convert 32.png favicon.ico
rm 32.png

# manifest stuff 
# mkdir "manifest"
cd "manifest"
inkscape -z -e icon48x48.png -w 48 -h 48 ../$i
inkscape -z -e icon96x96.png -w 96 -h 96 ../$i
inkscape -z -e icon128x128.png -w 128 -h 128 ../$i
inkscape -z -e icon144x144.png -w 144 -h 144 ../$i
inkscape -z -e icon192x192.png -w 192 -h 192 ../$i
inkscape -z -e icon256x256.png -w 256 -h 256 ../$i
inkscape -z -e icon384x384.png -w 384 -h 384 ../$i
inkscape -z -e icon512x512.png -w 512 -h 512 ../$i
cd ..

cd "apple"
inkscape -z -e apple-60.png -w 60 -h 60 ../$i
inkscape -z -e apple-76.png -w 76 -h 76 ../$i
inkscape -z -e apple-120.png -w 120 -h 120 ../$i
inkscape -z -e apple-152.png -w 152 -h 152 ../$i
inkscape -z -e apple-167.png -w 167 -h 167 ../$i
inkscape -z -e apple-180.png -w 180 -h 180 ../$i
cd ..

cd "favicon"
inkscape -z -e favicon-16.png -w 16 -h 16 ../$i
inkscape -z -e favicon-32.png -w 32 -h 32 ../$i
inkscape -z -e favicon-64.png -w 64 -h 64 ../$i
inkscape -z -e favicon-96.png -w 96 -h 96 ../$i
cd ..

done