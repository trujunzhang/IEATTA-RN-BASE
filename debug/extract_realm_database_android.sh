#!/bin/sh
mkdir /tmp/ieatta-db
ADB_PATH="/Users/djzhang/Library/Android/sdk/platform-tools"
PACKAGE_NAME="com.ieatta"
DB_NAME="default.realm"
DESTINATION_PATH="/tmp/ieatta-db/"
NOT_PRESENT="List of devices attached"
ADB_FOUND=`${ADB_PATH}/adb devices | tail -2 | head -1 | cut -f 1 | sed 's/ *$//g'`
if [[ ${ADB_FOUND} == ${NOT_PRESENT} ]]; then
	echo "Make sure a device is connected"
else
    ${ADB_PATH}/adb shell "
    	run-as ${PACKAGE_NAME} cp /data/data/${PACKAGE_NAME}/files/${DB_NAME} /sdcard/
		exit
	"
	${ADB_PATH}/adb pull "/sdcard/${DB_NAME}" "${DESTINATION_PATH}"
	open ${DESTINATION_PATH}${DB_NAME}
	echo "Database exported to ${DESTINATION_PATH}${DB_NAME}"
fi