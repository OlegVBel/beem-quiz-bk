import { Injectable, OnModuleInit } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit(): Promise<void> {
    try {
      const { stdout, stderr } = await execAsync(
        'npx sequelize-cli db:migrate',
      );
      console.log('Migration output:', stdout);
      if (stderr) {
        console.error('Migration error:', stderr);
      }
    } catch (error) {
      console.error('Migration failed:', error);
    }
  }
}
