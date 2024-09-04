package kr.co.iei.util;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class FileUtils {
	
	//파일의 저장경로와 파일객체를 매개변수로 받음
	//해당 저장경로에 파일명이 중복되지 않도록 업로드하고, 업로드된 파일명을 리턴하는 메소드
	public String upload(String savepath, MultipartFile file) {
		//원본파일명 추출 -> test.txt
		String filename = file.getOriginalFilename();
		//test			.txt 분리
		//원본파일명의 시작부터 제일 뒤에있는 . 앞까지 문자열로 가져옴 -> test
		String onlyFilename = filename.substring(0, filename.lastIndexOf("."));
		//원본파일명의 제일뒤에있는 .부터 끝까지를 문자열로 가져옴 -> .txt
		String extention = filename.substring(filename.lastIndexOf("."));
		//실제로 업로드할 파일명을 저장할 변수
		String filepath = null;
		//중복파일명이 있으면 증가시키면서 뒤에 붙일 숫자 변수
		int count = 0;
		while(true) {
			if(count == 0) {
				//첫번째는 원본파일명 그대로 적용
				filepath = onlyFilename + extention;
			}else {
				//두번째부터는 파일명에 숫자를 붙여서 처리
				filepath = onlyFilename+"_"+count+extention;
			}
			count++;
			//위에서 만든 파일명이 사용중인지 체크
			File checkFile = new File(savepath+filepath);
			if(!checkFile.exists()) {
				break;
			}
		}
		//파일명 중복체크 끝 -> 내가 업로드할 파일명 결정 -> 파일업로드 진행
		try {
			//중복체크가 끝난 파일명으로 파일을 업로드
			file.transferTo(new File(savepath+filepath));
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return filepath;
		
	}

	public void downloadFile(String savepath, String filename, String filepath, HttpServletResponse response) {
		String downFile = savepath+filepath;
		
		try {
			//첨부파일을 현재 서버로 읽어오기 위한 주 스트림 생성
			FileInputStream fis = new FileInputStream(downFile);
			//속도 개선을 위한 보조스트림 생성
			BufferedInputStream bis = new BufferedInputStream(fis);
			
			//읽어온 파일을 사용자에게 내보낼 주스트림 생성 -> response 객체 내부에 있음
			ServletOutputStream sos =  response.getOutputStream();
			//속도 개선을 위한 보조스트림 생성
			BufferedOutputStream bos = new BufferedOutputStream(sos);
			
			//다운로드한 파일이름 처리 (사용자가 받을 파일명)
			String resFilename = new String(filename.getBytes("utf-8"),"ISO-8859-1");
			
			//파일 다운로드를 위한 HTTP header 설정(응답형식/파일명 지정)
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition", "attachment;filename="+resFilename);
			
			while(true) {
				int read = bis.read();
				if(read != -1) {
					bos.write(read);
				}else {
					break;
				}
			}
			bos.close();
			bis.close();
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
