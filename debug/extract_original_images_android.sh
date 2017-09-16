#!/bin/sh
mkdir /tmp/ieatta-image
ADB_PATH="/Users/djzhang/Library/Android/sdk/platform-tools"
PACKAGE_NAME="com.ieatta"
IMAGE_NAME="PARSE_ORIGINAL_IMAGES"
DESTINATION_PATH="/tmp/ieatta-image/"
NOT_PRESENT="List of devices attached"
ADB_FOUND=`${ADB_PATH}/adb devices | tail -2 | head -1 | cut -f 1 | sed 's/ *$//g'`
if [[ ${ADB_FOUND} == ${NOT_PRESENT} ]]; then
	echo "Make sure a device is connected"
else
    echo "Android Original Images: /data/user/0/${PACKAGE_NAME}/files/${IMAGE_NAME}"
    ${ADB_PATH}/adb shell "
    	run-as ${PACKAGE_NAME} cp /data/user/0/${PACKAGE_NAME}/files/${IMAGE_NAME} /sdcard/
		exit
	"
	${ADB_PATH}/adb pull "/sdcard/${IMAGE_NAME}" "${DESTINATION_PATH}"
	echo "Original Images exported to ${DESTINATION_PATH}${IMAGE_NAME}"
fi