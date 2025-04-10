import path from "path";
import fs from "fs";
import {exec} from "child_process";
import {NAMESPACE_WEB_MIGRATION_X86, NAMESPACE_WEB_MIGRATION_ARM, WORDPRESS} from "@/constants/common";
import {TNamespaces, TWebMigrationAppsDBs} from "@/types/common";

const ARC_BASED_ON_NAMESPACE = {
    [NAMESPACE_WEB_MIGRATION_ARM]: "arm",
    [NAMESPACE_WEB_MIGRATION_X86]: "x86"
}

const BACKUP_FOLDER = "/home/ampere/mysql_backups";

export const getMysqlDump = async (podName: string="", namespace: TNamespaces, database="") => {
    const mysqlUser = process.env.DB_USER;
    const mysqlPassword = process.env.DB_PASSWORD;

    // Define the folder and file path on the VM
    const backupFile = path.join(BACKUP_FOLDER, `${database}-backup-${ARC_BASED_ON_NAMESPACE[namespace]}.sql`);

    // Ensure the backup directory exists
    if (!fs.existsSync(BACKUP_FOLDER)) {
        fs.mkdirSync(BACKUP_FOLDER, { recursive: true });
    }

    const backupCommand = `kubectl exec -n ${namespace} ${podName} -- sh -c "MYSQL_PWD=${mysqlPassword} mysqldump -u ${mysqlUser} ${database}" > ${backupFile}`;

    try {
        const response = await new Promise((resolve, reject) => {
            exec(backupCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error('MySQL backup failed:', stderr);
                    reject(error);
                } else {
                    console.log('MySQL backup successful:', stdout);
                    console.log("backup file name:", backupFile, podName, namespace, database);
                    resolve(stdout);
                }
            });
        });

        //modify WordPress database to avoid IP conflicts
        if(database === WORDPRESS){
            const tempFile = path.join(BACKUP_FOLDER,`${backupFile.split(".")[1]}.tmp`); // Temporary file

            // command to modify dump - arm to 86
            let modificationCommand = `sed -e "s^http://${process.env.NEXT_PUBLIC_ARM_NODE_IP}:30000^http://${process.env.NEXT_PUBLIC_X86_NODE_IP}:30002^g" ${backupFile} > ${tempFile}`;
            if(namespace === NAMESPACE_WEB_MIGRATION_X86){
                // command to modify dump - x86 to am
                modificationCommand = `sed -e "s^http://${process.env.NEXT_PUBLIC_X86_NODE_IP}:30002^http://${process.env.NEXT_PUBLIC_ARM_NODE_IP}:30000^g" ${backupFile} > ${tempFile}`;
            }

            const dumpModificationResponse = await new Promise((resolve, reject) => {
                exec(modificationCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error('MySQL dump modification failed:', stderr);
                        reject(error);
                    } else {
                        console.log('MySQL dump modification successful:', stdout);
                        console.log("dump modification file name:", backupFile, podName, namespace, database);
                        resolve(stdout);
                    }
                });
            });

            // ✅ Replace the original file with the modified version
            fs.renameSync(tempFile, backupFile);

            return {dumpModificationResponse};
        }

        return {response};
    } catch (error) {
        console.error("error while taking mysql dump", error);
    }
}

const getBackupFileNameToRestoreDump = (namespace:TNamespaces, database: TWebMigrationAppsDBs) => {
    if(namespace === NAMESPACE_WEB_MIGRATION_ARM){
        return `${database}-backup-${ARC_BASED_ON_NAMESPACE[NAMESPACE_WEB_MIGRATION_X86]}.sql`;
    }
    return `${database}-backup-${ARC_BASED_ON_NAMESPACE[NAMESPACE_WEB_MIGRATION_ARM]}.sql`;
}

export const restoreMysqlDump = async (podName="", namespace: TNamespaces, database: TWebMigrationAppsDBs) => {
    const mysqlUser = process.env.DB_USER;
    const mysqlPassword = process.env.DB_PASSWORD;

    // Define the folder and file path on the VM
    const backupFile = path.join(BACKUP_FOLDER, getBackupFileNameToRestoreDump(namespace, database));

    // Ensure the backup directory exists
    if (!fs.existsSync(BACKUP_FOLDER)) {
        fs.mkdirSync(BACKUP_FOLDER, { recursive: true });
    }

    const backupCommand = `kubectl exec -it -n ${namespace} ${podName} -- sh -c "MYSQL_PWD=${mysqlPassword} mysql -u ${mysqlUser} ${database}" < ${backupFile}`;

    try {
        const response = await new Promise((resolve, reject) => {
            exec(backupCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error('MySQL restored failed:', stderr);
                    console.log("restore action error:", error);
                    reject(error);
                } else {
                    console.log('MySQL restored successful:', stdout);
                    resolve(stdout);
                }
            });
        });

        if(database !== WORDPRESS){
            return {response};
        }
    } catch (error) {
        console.error("error while restoring mysql dump", error);
        return;
    }
}
