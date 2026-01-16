import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'ko';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'en',
      setLanguage: (lang: Language) => set({ language: lang }),
    }),
    {
      name: 'language-storage',
    }
  )
);

export const i18n = {
  en: {
    nav: {
      overview: 'Overview',
      poc: 'PoC',
      demo: 'Simulator',
    },
    hero: {
      title: 'Battlefield Deployment Simulator',
      subtitle: 'Optimal unmanned platform positioning using weighted scoring models',
      goToDemo: 'Run Simulator',
      viewPoc: 'View PoC',
    },
    sections: {
      problem: {
        title: 'Problem',
        description: 'Modern warfare faces critical challenges: manpower shortages, increased operational complexity, and the need for rapid autonomous preparation. Traditional manual deployment planning is time-consuming and prone to human error in high-pressure situations.',
      },
      coreIdea: {
        title: 'Core Idea',
        description: 'A 4-step pipeline transforms raw terrain data into optimal deployment positions',
        steps: {
          terrain: { title: 'Terrain Analysis', desc: 'Process elevation and obstacle data' },
          candidates: { title: 'Candidate Generation', desc: 'Identify potential positions' },
          scoring: { title: 'Weighted Scoring', desc: 'Evaluate each candidate' },
          deployment: { title: 'Optimal Deployment', desc: 'Select best positions' },
        },
      },
      platforms: {
        title: 'Platform Differences',
        artillery: {
          title: 'Artillery',
          description: 'Prioritizes open firing lanes, long-range visibility, and rapid repositioning capability. Lower exposure concerns due to standoff distance.',
        },
        tank: {
          title: 'Tank',
          description: 'Emphasizes hull-down positions, cover utilization, and balanced line-of-sight. Requires strong defensive positioning with offensive capability.',
        },
        ugv: {
          title: 'UGV',
          description: 'Focuses on mobility corridors, concealment, and flexible repositioning. Optimized for reconnaissance and support roles.',
        },
      },
      features: {
        title: 'What the Demo Can Do',
        presets: { title: 'Presets', desc: 'Quick-start with predefined terrain configurations' },
        randomize: { title: 'Randomize', desc: 'Generate varied terrain with controlled randomness' },
        manual: { title: 'Manual Editing', desc: 'Draw obstacles and modify terrain directly' },
        weights: { title: 'Weight Tuning', desc: 'Customize scoring parameters per platform' },
        top5: { title: 'Top 5 Analysis', desc: 'Compare best candidate positions with breakdowns' },
        export: { title: 'Export/Import', desc: 'Save and restore complete simulation states' },
      },
    },
    poc: {
      background: {
        title: 'Background and Motivation',
        content: 'The increasing complexity of modern battlefield environments demands intelligent decision support systems. This PoC addresses the critical need for automated position selection for unmanned platforms, reducing cognitive load on operators while improving tactical outcomes. With rising manpower constraints and the proliferation of unmanned systems, autonomous deployment preparation becomes essential for maintaining operational tempo.',
      },
      objectives: {
        title: 'Simulator Objectives',
        content: 'Demonstrate feasibility of automated position selection for three distinct platform types: Artillery units requiring standoff positions with clear firing lanes, Tank units needing hull-down defensive positions, and UGV units optimized for mobility and concealment. Each platform type has unique tactical requirements reflected in customizable weight parameters.',
        badge: 'Implemented in Simulator',
      },
      approach: {
        title: 'Solution Approach',
        criteria: {
          title: 'Position Selection Criteria',
          items: [
            'Line-of-sight to enemy positions (friendly visibility)',
            'Exposure to enemy observation/fire',
            'Available cover from terrain features',
            'Elevation advantage over threat positions',
            'Mobility and repositioning potential',
            'Separation from friendly units (dispersion)',
          ],
        },
        reward: {
          title: 'Weighted Reward Function',
          description: 'The scoring function combines multiple tactical factors with platform-specific weights:',
          formula: 'Score = w_vis × Visibility - w_exp × Exposure + w_cov × Cover + w_ele × Elevation + w_mob × Mobility - w_sep × Separation',
        },
        io: {
          title: 'Input / Output Definition',
          inputs: ['Terrain grid (elevation, obstacles)', 'Enemy position and orientation', 'Platform type and count', 'Weight configuration'],
          outputs: ['Optimal positions per unit', 'Score breakdown per position', 'Top 5 candidate analysis', 'Visualization overlays'],
        },
        badge: 'Implemented in Simulator',
      },
      process: {
        title: 'Process',
        steps: [
          { title: 'Terrain Input', desc: 'Load or generate battlefield grid' },
          { title: 'Threat Analysis', desc: 'Calculate enemy coverage zones' },
          { title: 'Candidate Sampling', desc: 'Generate potential positions' },
          { title: 'Score Computation', desc: 'Evaluate all candidates' },
          { title: 'Position Selection', desc: 'Deploy optimal placements' },
        ],
      },
      outcomes: {
        title: 'Expected Outcomes',
        tactical: {
          title: 'Tactical Benefits',
          items: ['Reduced planning time by 60-80%', 'Consistent application of tactical principles', 'Optimized unit dispersion'],
        },
        technical: {
          title: 'Technical Achievements',
          items: ['Real-time scoring computation', 'Interactive terrain editing', 'Platform-specific optimization'],
        },
        extension: {
          title: 'Extensibility',
          items: ['Multi-threat scenarios', 'Dynamic repositioning', 'RL-based optimization'],
        },
      },
    },
    demo: {
      toolbar: {
        run: 'Run',
        step: 'Step',
        reset: 'Reset',
        preset: 'Preset',
        randomize: 'Randomize',
        editMode: 'Edit Mode',
        export: 'Export JSON',
        import: 'Import JSON',
      },
      presets: {
        openField: 'Open Field',
        denseObstacles: 'Dense Obstacles',
        mixed: 'Mixed',
        ridgeValley: 'Ridge / Valley',
      },
      editMode: {
        title: 'Edit Mode',
        description: 'Create or modify obstacles manually to simulate specific battlefield layouts',
        optional: '(Optional — presets and random maps are also available)',
        brushSize: 'Brush Size',
        obstacleType: 'Obstacle Type',
        building: 'Building',
        forest: 'Forest',
        hill: 'Hill',
        eraser: 'Eraser',
      },
      control: {
        title: 'Control Panel',
        template: 'Platform Template',
        artillery: 'Artillery',
        tank: 'Tank',
        ugv: 'UGV',
        custom: 'Custom',
        weights: 'Weight Configuration',
        visibility: 'Visibility',
        exposure: 'Exposure',
        cover: 'Cover',
        elevation: 'Elevation',
        mobility: 'Mobility',
        separation: 'Separation',
        unitCount: 'Unit Count',
        samplingDensity: 'Sampling Density',
        toggles: 'Display Toggles',
        losToggle: 'Line of Sight',
        threatCone: 'Threat Cone',
        distanceAtten: 'Distance Attenuation',
      },
      results: {
        title: 'Results',
        noResults: 'Run simulation to see results',
        summary: 'Summary Metrics',
        avgExposure: 'Avg Exposure',
        avgVisibility: 'Avg Visibility',
        minDistance: 'Min Distance',
        totalScore: 'Total Score',
        positions: 'Selected Positions',
        unit: 'Unit',
        position: 'Position',
        score: 'Score',
        top5: 'Top 5 Candidates',
        breakdown: 'Score Breakdown',
      },
      tutorial: {
        title: 'Welcome to the Battlefield Simulator',
        steps: [
          { title: 'Select Terrain', desc: 'Choose a preset or click Randomize to generate terrain' },
          { title: 'Edit (Optional)', desc: 'Toggle Edit Mode to draw obstacles manually' },
          { title: 'Configure Weights', desc: 'Select a platform template or customize weights' },
          { title: 'Run Simulation', desc: 'Click Run for instant results or Step for sequential placement' },
          { title: 'Analyze Results', desc: 'Review positions, scores, and export your configuration' },
        ],
        skip: 'Skip Tutorial',
        next: 'Next',
        gotIt: 'Got It',
      },
      legend: {
        title: 'Legend',
        enemy: 'Enemy',
        friendly: 'Friendly',
        building: 'Building',
        forest: 'Forest',
        hill: 'Hill',
        selected: 'Selected Position',
      },
    },
    common: {
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
    },
  },
  ko: {
    nav: {
      overview: '개요',
      poc: 'PoC',
      demo: '시뮬레이터',
    },
    hero: {
      title: '전장 배치 시뮬레이터',
      subtitle: '가중치 기반 점수 모델을 활용한 무인 플랫폼 최적 배치',
      goToDemo: '시뮬레이터 실행',
      viewPoc: 'PoC 보기',
    },
    sections: {
      problem: {
        title: '문제 정의',
        description: '현대전은 인력 부족, 운용 복잡성 증가, 신속한 자율 준비의 필요성 등 심각한 도전에 직면해 있습니다. 기존의 수동 배치 계획은 시간이 많이 소요되며 고압 상황에서 인적 오류가 발생하기 쉽습니다.',
      },
      coreIdea: {
        title: '핵심 아이디어',
        description: '4단계 파이프라인이 원시 지형 데이터를 최적의 배치 위치로 변환합니다',
        steps: {
          terrain: { title: '지형 분석', desc: '고도 및 장애물 데이터 처리' },
          candidates: { title: '후보 생성', desc: '잠재적 위치 식별' },
          scoring: { title: '가중치 평가', desc: '각 후보 평가' },
          deployment: { title: '최적 배치', desc: '최적 위치 선택' },
        },
      },
      platforms: {
        title: '플랫폼 차이점',
        artillery: {
          title: '포병',
          description: '개방된 사격 경로, 장거리 시야, 신속한 재배치 능력을 우선시합니다. 이격 거리로 인해 노출 우려가 낮습니다.',
        },
        tank: {
          title: '전차',
          description: '차체 은폐 위치, 엄폐물 활용, 균형 잡힌 시야를 강조합니다. 공격 능력과 함께 강력한 방어 위치가 필요합니다.',
        },
        ugv: {
          title: 'UGV',
          description: '기동 통로, 은폐, 유연한 재배치에 집중합니다. 정찰 및 지원 역할에 최적화되어 있습니다.',
        },
      },
      features: {
        title: '데모 기능',
        presets: { title: '프리셋', desc: '사전 정의된 지형 구성으로 빠른 시작' },
        randomize: { title: '랜덤 생성', desc: '제어된 무작위성으로 다양한 지형 생성' },
        manual: { title: '수동 편집', desc: '장애물 직접 그리기 및 지형 수정' },
        weights: { title: '가중치 조정', desc: '플랫폼별 점수 매개변수 사용자 정의' },
        top5: { title: 'Top 5 분석', desc: '최적 후보 위치 비교 및 분석' },
        export: { title: '내보내기/가져오기', desc: '완전한 시뮬레이션 상태 저장 및 복원' },
      },
    },
    poc: {
      background: {
        title: '배경 및 동기',
        content: '현대 전장 환경의 복잡성 증가는 지능형 의사결정 지원 시스템을 요구합니다. 이 PoC는 무인 플랫폼의 자동 위치 선택에 대한 중요한 필요성을 다루며, 운용자의 인지 부하를 줄이면서 전술적 결과를 개선합니다. 인력 제약 증가와 무인 시스템의 확산으로 자율적 배치 준비는 작전 템포 유지에 필수적입니다.',
      },
      objectives: {
        title: '시뮬레이터 목표',
        content: '세 가지 플랫폼 유형에 대한 자동 위치 선택의 타당성을 입증합니다: 명확한 사격 경로가 필요한 포병 유닛, 차체 은폐 방어 위치가 필요한 전차 유닛, 기동성과 은폐에 최적화된 UGV 유닛. 각 플랫폼 유형에는 사용자 정의 가능한 가중치 매개변수에 반영된 고유한 전술적 요구사항이 있습니다.',
        badge: '시뮬레이터에서 구현됨',
      },
      approach: {
        title: '솔루션 접근법',
        criteria: {
          title: '위치 선택 기준',
          items: [
            '적 위치에 대한 시야 (아군 가시성)',
            '적 관측/사격에 대한 노출',
            '지형 특성에서 가용한 엄폐',
            '위협 위치에 대한 고도 이점',
            '기동성 및 재배치 잠재력',
            '아군 유닛과의 분리 (분산)',
          ],
        },
        reward: {
          title: '가중치 보상 함수',
          description: '점수 함수는 플랫폼별 가중치와 여러 전술적 요소를 결합합니다:',
          formula: '점수 = w_vis × 가시성 - w_exp × 노출 + w_cov × 엄폐 + w_ele × 고도 + w_mob × 기동성 - w_sep × 분리',
        },
        io: {
          title: '입력 / 출력 정의',
          inputs: ['지형 그리드 (고도, 장애물)', '적 위치 및 방향', '플랫폼 유형 및 수량', '가중치 구성'],
          outputs: ['유닛별 최적 위치', '위치별 점수 분석', 'Top 5 후보 분석', '시각화 오버레이'],
        },
        badge: '시뮬레이터에서 구현됨',
      },
      process: {
        title: '프로세스',
        steps: [
          { title: '지형 입력', desc: '전장 그리드 로드 또는 생성' },
          { title: '위협 분석', desc: '적 커버리지 영역 계산' },
          { title: '후보 샘플링', desc: '잠재적 위치 생성' },
          { title: '점수 계산', desc: '모든 후보 평가' },
          { title: '위치 선택', desc: '최적 배치 수행' },
        ],
      },
      outcomes: {
        title: '기대 결과',
        tactical: {
          title: '전술적 이점',
          items: ['계획 시간 60-80% 단축', '전술 원칙의 일관된 적용', '최적화된 유닛 분산'],
        },
        technical: {
          title: '기술적 성과',
          items: ['실시간 점수 계산', '대화형 지형 편집', '플랫폼별 최적화'],
        },
        extension: {
          title: '확장성',
          items: ['다중 위협 시나리오', '동적 재배치', 'RL 기반 최적화'],
        },
      },
    },
    demo: {
      toolbar: {
        run: '실행',
        step: '단계',
        reset: '초기화',
        preset: '프리셋',
        randomize: '랜덤 생성',
        editMode: '편집 모드',
        export: 'JSON 내보내기',
        import: 'JSON 가져오기',
      },
      presets: {
        openField: '개활지',
        denseObstacles: '밀집 장애물',
        mixed: '혼합',
        ridgeValley: '능선 / 계곡',
      },
      editMode: {
        title: '편집 모드',
        description: '특정 전장 지형을 가정하여 장애물을 직접 생성하거나 수정할 수 있습니다',
        optional: '(선택 사항 — 프리셋 및 랜덤 지형도 함께 사용할 수 있습니다)',
        brushSize: '브러시 크기',
        obstacleType: '장애물 유형',
        building: '건물',
        forest: '숲',
        hill: '언덕',
        eraser: '지우개',
      },
      control: {
        title: '제어판',
        template: '플랫폼 템플릿',
        artillery: '포병',
        tank: '전차',
        ugv: 'UGV',
        custom: '사용자 정의',
        weights: '가중치 설정',
        visibility: '가시성',
        exposure: '노출',
        cover: '엄폐',
        elevation: '고도',
        mobility: '기동성',
        separation: '분리',
        unitCount: '유닛 수',
        samplingDensity: '샘플링 밀도',
        toggles: '표시 토글',
        losToggle: '시야선',
        threatCone: '위협 구역',
        distanceAtten: '거리 감쇠',
      },
      results: {
        title: '결과',
        noResults: '시뮬레이션을 실행하여 결과 확인',
        summary: '요약 지표',
        avgExposure: '평균 노출',
        avgVisibility: '평균 가시성',
        minDistance: '최소 거리',
        totalScore: '총점',
        positions: '선택된 위치',
        unit: '유닛',
        position: '위치',
        score: '점수',
        top5: 'Top 5 후보',
        breakdown: '점수 분석',
      },
      tutorial: {
        title: '전장 시뮬레이터에 오신 것을 환영합니다',
        steps: [
          { title: '지형 선택', desc: '프리셋을 선택하거나 랜덤 생성을 클릭하세요' },
          { title: '편집 (선택)', desc: '편집 모드를 켜서 장애물을 직접 그리세요' },
          { title: '가중치 설정', desc: '플랫폼 템플릿을 선택하거나 가중치를 사용자 정의하세요' },
          { title: '시뮬레이션 실행', desc: '실행을 클릭하여 즉시 결과를 보거나 단계별로 배치하세요' },
          { title: '결과 분석', desc: '위치, 점수를 검토하고 구성을 내보내세요' },
        ],
        skip: '튜토리얼 건너뛰기',
        next: '다음',
        gotIt: '완료',
      },
      legend: {
        title: '범례',
        enemy: '적',
        friendly: '아군',
        building: '건물',
        forest: '숲',
        hill: '언덕',
        selected: '선택된 위치',
      },
    },
    common: {
      darkMode: '다크 모드',
      lightMode: '라이트 모드',
    },
  },
};

export function useTranslation() {
  const { language } = useLanguageStore();
  return i18n[language];
}
