import path from "path";
import fs from "fs";
import {exec} from "child_process";
import {NAMESPACE_WEB_MIGRATION_X86, NAMESPACE_WORDPRESS, WORDPRESS} from "@/constants/common";
import {TNamespaces, TWebMigrationAppsDBs} from "@/types/common";

const ARC_BASED_ON_NAMESPACE = {
    [NAMESPACE_WORDPRESS]: "arm",
    [NAMESPACE_WEB_MIGRATION_X86]: "x86"
}

const NAMESPACES_BASED_HOSTS =  {
    [NAMESPACE_WORDPRESS]: `http://${process.env.ARM_NODE_IP}:30000`,
    [NAMESPACE_WEB_MIGRATION_X86]: `http://${process.env.X86_NODE_IP}:30002`
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

        return {response};
    } catch (error) {
        console.error("error while taking mysql dump", error);
    }
}

const getBackupFileNameToRestoreDump = (namespace:TNamespaces, database: TWebMigrationAppsDBs) => {
    if(namespace === NAMESPACE_WORDPRESS){
        return `${database}-backup-${ARC_BASED_ON_NAMESPACE[NAMESPACE_WEB_MIGRATION_X86]}.sql`;
    }
    return `${database}-backup-${ARC_BASED_ON_NAMESPACE[NAMESPACE_WORDPRESS]}.sql`;
}

const getOppositeNamespaceNodeIp = (namespace: TNamespaces) => {
    if(namespace === NAMESPACE_WORDPRESS){
        return NAMESPACES_BASED_HOSTS[NAMESPACE_WEB_MIGRATION_X86];
    }
    return NAMESPACES_BASED_HOSTS[NAMESPACE_WORDPRESS];
}

export const restoreMysqlDump = async (podName="", namespace: TNamespaces, database: TWebMigrationAppsDBs, wordpressPodName: string) => {
    const mysqlUser = process.env.DB_USER;
    const mysqlPassword = process.env.DB_PASSWORD;

    console.log("podName at action", podName, namespace, database, wordpressPodName);

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

    if(database === WORDPRESS) {
        try {
            const replaceCommand = `kubectl exec -it -n ${namespace} ${wordpressPodName} -- sh -c "wp search-replace ${getOppositeNamespaceNodeIp(namespace)} ${NAMESPACES_BASED_HOSTS[namespace]} --skip-columns=guid --allow-root"`;

            const response = await new Promise((resolve, reject) => {
                exec(replaceCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.error('MySQL replace failed:', stderr);
                        console.log("restore replace error:", error);
                        reject(error);
                    } else {
                        console.log('MySQL replace successful:', stdout);
                        resolve(stdout);
                    }
                });
            });

            return {response};
        } catch (error) {
            console.error("error while replacing mysql dump", error);
            return;
        }
    }
}
