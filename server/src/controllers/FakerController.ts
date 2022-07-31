import FakerData from '@/app/FakerData';
import { Request, Response } from 'express';
import { validator } from '@/app/validator';
import { DEF_LOCALE } from '@/app/constants';
import { FakerDataState } from '@/types/FakerData';

type FakerState = (
  req: Request,
  res: Response
) => Promise<Response<any, Record<string, any>>>;

const FakerController: FakerState = async (req, res) => {
  return validator(
    {
      response: res,
      schema: 'query',
      body: {
        ...req.query,
        seed: Number(req.query.seed),
        error: parseFloat(req.query.error as string),
        page: req.query.page ? Number(req.query.page) : undefined,
        size: req.query.size ? Number(req.query.size) : undefined,
      },
    },
    ({ seed, page, size, error = 0, locale = DEF_LOCALE }: FakerDataState) => {
      const fakerData = new FakerData({
        page,
        size,
        seed,
        error,
        locale,
      });

      return {
        data: fakerData.random(),
      };
    }
  );
};

export default FakerController;
