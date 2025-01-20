import { Request, Response } from 'express';
import { deleteCases, getAllAndContri,getCasename,getId,getInsights,getPriority, postCases, updateCases } from './caseController';
import { caseService } from '../services/casesService';

jest.mock('../services/casesService');

describe('caseController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    req.params = {};
    req.body={};
    next = jest.fn();
  });

  describe('getAllAndContri', () => {
    it('should return 200 and result from caseService.getAllAndContri', async () => {
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
        }
      ];
      (caseService.getAllAndContri as jest.Mock).mockResolvedValue(mockResult);

      await getAllAndContri(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return 500 if caseService.getAllAndContri throws an error', async () => {
      const mockError = new Error('error fetching case');
      (caseService.getAllAndContri as jest.Mock).mockRejectedValue(mockError);

      await getAllAndContri(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('getInsights', () => {
    it('should return 200 and result from caseService.getInsights', async () => {
      const mockResult = {
        "casename": "case 15",
        "priority": "Medium",
        "type": "General",
        "status": "Open",
        "opendate": "2024-12-05",
        "co2": 14.29,
        "h2o": 28.57,
        "o2": 42.86,
        "n2": 14.29,

    };
      (caseService.getInsights as jest.Mock).mockResolvedValue(mockResult);
      req.params = { id: '1' };

      await getInsights(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
    //   console.log(res)
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return 500 if caseService.getInsights throws an error', async () => {
      const mockError = new Error('error while fetching insights');
      (caseService.getInsights as jest.Mock).mockRejectedValue(mockError);
      req.params = { id: '1' };

      await getInsights(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('getPriority', () => {
    it('should return 200 and result from caseService.getPriority', async () => {
      const mockResult =[{
        priority: "High",
        total_count: "5",
        contributing_count: "3"
    },
    {
        priority: "Medium",
        total_count: "6",
        contributing_count: "5"
        
    },
    {
        priority: "Low",
        total_count: "4",
        contributing_count: "3"
        
    }];
      (caseService.getPriority as jest.Mock).mockResolvedValue(mockResult);

      await getPriority(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return 500 if caseService.getPriority throws an error', async () => {
      const mockError = new Error('error while fetching priority count');
      (caseService.getPriority as jest.Mock).mockRejectedValue(mockError);

      await getPriority(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('postCases', () => {
    it('should return 200 if caseService.postCases is successful', async () => {
      (caseService.postCases as jest.Mock).mockResolvedValue('Success');
      req.body = {
        casename: 'case 15',
        priority: 'Medium',
        type: 'General',
        status: 'Open',
        opendate: '2024-12-05',
        contributing: 'contributing',
        statuskey: 'success',
        co2: 14.29,
        h2o: 28.57,
        o2: 42.86,
        n2: 14.29
      };

      await postCases(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Posted data succesfully' });
    });

    it('should return 500 if caseService.postCases throws an error', async () => {
      const mockError = new Error('error adding case');
      (caseService.postCases as jest.Mock).mockRejectedValue(mockError);

      await postCases(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('updateCases', () => {
    it('should return 200 if caseService.updateCases is successful', async () => {
   
        req.body = {
            casename: 'case 15',
            priority: 'Medium',
            type: 'General',
            status: 'Open',
            opendate: '2024-12-05',
            contributing: 'contributing',
            statuskey: 'success',
            co2: 14.29,
            h2o: 28.57,
            o2: 42.86,
            n2: 14.29
        };
        req.params = { id: '1' };
        (caseService.updateCases as jest.Mock).mockResolvedValue('Success');
        
      await updateCases(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'updated data successfully' });
    });

    it('should return 500 if caseService.updateCases throws an error', async () => {
      const mockError = new Error('error while updating case');
      (caseService.updateCases as jest.Mock).mockRejectedValue(mockError);

      await updateCases(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('deleteCases', () => {  
    it('should return 200 if caseService.deleteCases is successful', async () => {
        req.params = { id: '1' };
        (caseService.deleteCases as jest.Mock).mockResolvedValue('Success');
    
      await deleteCases(req as Request, res as Response);
    
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'deleted data successfully ' });
    });

    it('should return 500 if caseService.deleteCases throws an error', async () => {
      const mockError = new Error('error while deleting case');
      (caseService.deleteCases as jest.Mock).mockRejectedValue(mockError);

      await deleteCases(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  } );

  describe('getId', () => {
    it('should return 200 and result from caseService.getId', async () => {
      const mockResult = [
        {
            "casenumber": 36
        }
      ];
      (caseService.getId as jest.Mock).mockResolvedValue(mockResult);
      req.params = { casename: 'case 15' };

      await getId(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return 500 if caseService.getId throws an error', async () => {
      const mockError = new Error('error while fetching id');
      (caseService.getId as jest.Mock).mockRejectedValue(mockError);
      req.params = { casename: 'case 15' };

      await getId(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

  describe('validateCasename', () => {
    it('should return 200 and result from caseService.validateCasename', async () => {
      const mockResult = [
        {
            "casename": "case 15"
        }
      ];
      (caseService.getCasename as jest.Mock).mockResolvedValue(mockResult);
      req.params = { casename: 'case 15' };

      await getCasename(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    it('should return 500 if caseService.validateCasename throws an error', async () => {
      const mockError = new Error('error while fetching casename');
      (caseService.getCasename as jest.Mock).mockRejectedValue(mockError);
      req.params = { casename: 'case 15' };

      await getCasename(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: mockError.message });
    });
  });

});