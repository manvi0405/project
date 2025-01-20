import { caseService } from './casesService';
import { CaseDao } from '../dao/caseDao';
import { Pool } from 'pg';
import dotenv from 'dotenv'
dotenv.config();

jest.mock('../dao/caseDao');

describe('caseService', () => {
  let pool: Pool;
  beforeAll(async () => {
    pool = new Pool({
      user: process.env.DB_USERNAME ,
      host: process.env.DB_HOST ,
      database: process.env.DB_DATABASE ,
      password: process.env.DB_PASSWORD ,
      port: parseInt(process.env.DB_PORTNO || '5432', 10)
    });

    // Ensure the database connection is established before running tests
    const client = await pool.connect();
    client.release();
  });

  afterAll(async () => {
    await pool.end();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAndContri', () => {
    it('should return result from CaseDao.getAllAndContri', async () => {
      const mockResult  = [
        {
          "casename": "case 15",
          "priority": "Medium",
          "type": "General",
          "status": "Open",
          "opendate": "2024-12-05",
          "co2": 14.29,
          "h2o": 28.57,
          "o2": 42.86,
          "n2": 14.29,
          "statuskey": "success",
          "contributing": "contributing"
      },
      {
          "casename": "case 7",
          "priority": "High",
          "type": "General",
          "status": "Open",
          "opendate": "2024-12-25",
          "co2": 26.09,
          "h2o": 45.65,
          "o2": 23.91,
          "n2": 4.35,
          "statuskey": "success",
          "contributing": "contributing"
      },
    ];
      (CaseDao.getAllAndContri as jest.Mock).mockResolvedValue(mockResult);

      const result = await caseService.getAllAndContri();
      expect(result).toEqual(mockResult);
      expect(CaseDao.getAllAndContri).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if CaseDao.getAllAndContri throws an error', async () => {
      const mockError = new Error('Test Error');
      (CaseDao.getAllAndContri as jest.Mock).mockRejectedValue(mockError);

      await expect(caseService.getAllAndContri()).rejects.toThrow('Test Error');
      expect(CaseDao.getAllAndContri).toHaveBeenCalledTimes(1);
    });
  });

  describe('getInsights', () => {
    it('should return result from CaseDao.getInsights', async () => {
      const mockResult = [
        {
          "casename": "case 15",
          "priority": "Medium",
          "type": "General",
          "status": "Open",
          "opendate": "2024-12-05",
          "co2": 14.29,
          "h2o": 28.57,
          "o2": 42.86,
          "n2": 14.29,

      },
    ];
      (CaseDao.getInsights as jest.Mock).mockResolvedValue(mockResult);

      const result = await caseService.getInsights(1);
      expect(result).toEqual(mockResult);
      console.log(result)
      expect(CaseDao.getInsights).toHaveBeenCalledWith(1);
      expect(CaseDao.getInsights).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if CaseDao.getInsights throws an error', async () => {
      const mockError = new Error('Test Error');
      (CaseDao.getInsights as jest.Mock).mockRejectedValue(mockError);

      await expect(caseService.getInsights(1)).rejects.toThrow('Test Error');
      expect(CaseDao.getInsights).toHaveBeenCalledWith(1);
      expect(CaseDao.getInsights).toHaveBeenCalledTimes(1);
    });
  });

  describe('getPriority', () => {
    it('should return result from CaseDao.getPriority', async () => {
      const mockResult = [{
        priority: "High",
        total_count: "5",
        contributing_count: "3"
    },{
        priority: "Medium",
        total_count: "6",
        contributing_count: "5"
        
    },
    {
        priority: "Low",
        total_count: "4",
        contributing_count: "3"
        
    }];
      (CaseDao.getPriority as jest.Mock).mockResolvedValue(mockResult);

      const result = await caseService.getPriority();
      expect(result).toEqual(mockResult);
      expect(CaseDao.getPriority).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if CaseDao.getPriority throws an error', async () => {
      const mockError = new Error('Test Error');
      (CaseDao.getPriority as jest.Mock).mockRejectedValue(mockError);

      await expect(caseService.getPriority()).rejects.toThrow('Test Error');
      expect(CaseDao.getPriority).toHaveBeenCalledTimes(1);
    });
  });

  describe('postCases', () => {
    it('should return result from CaseDao.postCases', async () => {
      (CaseDao.postCases as jest.Mock).mockResolvedValue('Success');

      const result = await caseService.postCases('case 15', 'Medium', 'General', 'Open', '2024-12-05', 'contributing', 'success', 14.29, 28.57, 42.86, 14.29);
      expect(result).toEqual('Success');
      expect(CaseDao.postCases).toHaveBeenCalledWith('case 15', 'Medium', 'General', 'Open', '2024-12-05', 'contributing', 'success', 14.29, 28.57, 42.86, 14.29);
      expect(CaseDao.postCases).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if CaseDao.postCases throws an error', async () => {
      const mockError = new Error('Test Error');
      (CaseDao.postCases as jest.Mock).mockRejectedValue(mockError);

      await expect(caseService.postCases('case 15', 'Medium', 'General', 'Open', '2024-12-05', 'contributing', 'success', 14.29, 28.57, 42.86, 14.29)).rejects.toThrow('Test Error');
      expect(CaseDao.postCases).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateCases', () => {
    it('should return result from CaseDao.updateCases', async () => {
      (CaseDao.updateCases as jest.Mock).mockResolvedValue('Success');

      const result = await caseService.updateCases('case 15', 'Medium', 'General', 'Open', '2024-12-05', 'contributing', 'success', 14.29, 28.57, 42.86, 14.29, 1);
      expect(result).toEqual('Success');
      expect(CaseDao.updateCases).toHaveBeenCalledWith('case 15', 'Medium', 'General', 'Open', '2024-12-05', 'contributing', 'success', 14.29, 28.57, 42.86, 14.29, 1);
      expect(CaseDao.updateCases).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if CaseDao.updateCases throws an error', async () => {
      const mockError = new Error('Test Error');
      (CaseDao.updateCases as jest.Mock).mockRejectedValue(mockError);

      await expect(caseService.updateCases('case 15', 'Medium', 'General', 'Open', '2024-12-05', 'contributing', 'success', 14.29, 28.57, 42.86, 14.29, 1)).rejects.toThrow('Test Error');
      expect(CaseDao.updateCases).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteCases', () => {
    it('should return result from CaseDao.deleteCases', async () => {
      (CaseDao.deleteCases as jest.Mock).mockResolvedValue('Success');

      const result = await caseService.deleteCases(1);
      expect(result).toEqual('Success');
      expect(CaseDao.deleteCases).toHaveBeenCalledWith(1);
      expect(CaseDao.deleteCases).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if CaseDao.deleteCases throws an error', async () => {
      const mockError = new Error('Test Error');
      (CaseDao.deleteCases as jest.Mock).mockRejectedValue(mockError);

      await expect(caseService.deleteCases(1)).rejects.toThrow('Test Error');
      expect(CaseDao.deleteCases).toHaveBeenCalledWith(1);
      expect(CaseDao.deleteCases).toHaveBeenCalledTimes(1);
    });
  });

  describe('getId',()=>{
    it('should return result from CaseDao.getId', async () => {
      const mockResult = {
        id: 1
      };
      (CaseDao.getId as jest.Mock).mockResolvedValue(mockResult);

      const result = await caseService.getId('case 15');
      expect(result).toEqual(mockResult);
      expect(CaseDao.getId).toHaveBeenCalledWith('case 15');
      expect(CaseDao.getId).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if CaseDao.getId throws an error', async () => {
      const mockError = new Error('Test Error');
      (CaseDao.getId as jest.Mock).mockRejectedValue(mockError);

      await expect(caseService.getId('case 15')).rejects.toThrow('Test Error');
      expect(CaseDao.getId).toHaveBeenCalledWith('case 15');
      expect(CaseDao.getId).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCasename',()=>{
    it('should return result from CaseDao.getCasename', async () => {
      const mockResult = {
        casename: 'case 15'
      };
      (CaseDao.validateCasename as jest.Mock).mockResolvedValue(mockResult);

      const result = await caseService.getCasename('case 15');
      expect(result).toEqual(mockResult);
      expect(CaseDao.validateCasename).toHaveBeenCalledWith('case 15');
      expect(CaseDao.validateCasename).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if CaseDao.getCasename throws an error', async () => {
      const mockError = new Error('Test Error');
      (CaseDao.validateCasename as jest.Mock).mockRejectedValue(mockError);

      await expect(caseService.getCasename('case 15')).rejects.toThrow('Test Error');
      expect(CaseDao.validateCasename).toHaveBeenCalledWith('case 15');
      expect(CaseDao.validateCasename).toHaveBeenCalledTimes(1);
    });
  })
});