#!/usr/bin/env bash

echo "                                                                                                    "
echo "    ###                             f##      K###.    K#                                            "
echo "   L##                              ###     ##  ##    ##                                            "
echo "   K#E                              ##i    #K   ##L   #E                                            "
echo "   ##          ,KK;      EL;#     fE##    ##    ##.   #j ;t      jK #E   L. :KD      ,Kt      ;KE   "
echo "   ##         #####K   t#EW##    ##W##    ##   ,     i#,####    ##D##    ##K####    #####   :#####  "
echo "   #D        :,#E.##  .#.  #E   ##  #K   i#i         ###. D#t  ##  ##    t##  E#   ##   #. ;##  ##  "
echo "   #t        #W   ##  ##   #L   #E  #i   D#,         ##j  .#W f#   ##    ,#    #L .#    #i ##   #t  "
echo "   #f        #;   ## j#,   #L  K#   #,   D#t     #.  ##:  :## ##   ##    ,#.   ## K#    #f #t  #E   "
echo "   #E        #:   ## ##   ;#K  ##   #:   i##    ,##. ##:  j#W.#K   ##    E#:   ## ##   f#L:####  :  "
echo "   W#    EG  #t   ## ##:  ###  ##   #E    ##    ###  ##,  K#G,##  L##    ##,   ## t##iW##t #D   K#  "
echo "    #W  W##  ##: ##  ########. D####i###  D#######   ##;  ##f:########   ##,  D##  #### #: ##,;###  "
echo "    E######G .####;  t###Ef###  ###E ##.   K#####   t##K :##t #### ###; ###,  ### D    E#   #####;  "
echo "               ;,         ;                                        .    ,.        ##. L##     ,     "
echo "                                                                                  ######:           "
echo "                                                                                  ;###K             "

rm -rf ./dist/*

node build/build.js

ssh root@test -p 61067 "rm -rf /data/artup-pc/* ;"

scp -r -P 61067  ./dist/* root@test:/data/artup-pc/


echo "The deployment was successful !!!"
