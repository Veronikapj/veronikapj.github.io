# Animation with MotionLayout

Created By: PilJu BAE
Last Edited: Oct 26, 2020 12:51 AM
Links: https://codelabs.developers.google.com/codelabs/motion-layout/#0
events: devfest2020

- 1. Before you begin

    MotionLayout을 사용한 애니메이션은 [Constraint Layout이 있는 Keyframe 애니메이션과 동일한 개념](https://youtu.be/OHcfs6rStRo)을 많이 활용하고 이러한 개념을 확장하여 애니메이션을 세밀하게 사용자 지정할 수 있습니다. 

    [Keyframe Animations with ConstraintLayout and ConstraintSet](https://www.notion.so/Keyframe-Animations-with-ConstraintLayout-and-ConstraintSet-141a65260ec94ff293f71a5a17eacde3) 

    `MotionLayout`은 Android 앱에 풍부한 모션을 추가 할 수있는 라이브러리입니다. `ConstraintLayout`을 기반으로 하며 `ConstraintLayout`을 사용하여 빌드 할 수 있는 모든 것에 애니메이션을 적용 할 수 있습니다.

    `MotionLayout`을 사용하여 위치, 크기, 가시성, 알파, 색상, 고도, 회전 및 여러 뷰의 기타 속성을 동시에 애니메이션 할 수 있습니다. declarative XML을 사용하면 코드에서 만들기 어려운 여러 뷰를 포함하는 애니메이션을 만들 수 있습니다.

    애니메이션은 앱 경험을 향상시키는 좋은 방법입니다. 애니메이션을 사용하여 다음을 수행 할 수 있습니다.

    - **Show changes** : state 를 변경하는 애니메이션을 통해 사용자는 자연스럽게 UI의 변경 사항을 추적 할 수 있습니다.
    - **Draw attention** : 애니메이션을 사용하여 중요한 UI 요소에 주의를 끌 수 있습니다.
    - **Build beautiful designs** : 디자인의 효과적인 동작은 앱을 세련되게 만듭니다.

    ### Prerequisites

    - 기본적으로 Android Studio 를 사용하여 기기 또는 에뮬레이터에서 앱을 만드는 방법
    - [ConstraintLayout](https://codelabs.developers.google.com/codelabs/constraint-layout/index.html#0) 사용하기
    - [ConstraintLayout 2.0](https://developer.android.com/jetpack/androidx/releases/constraintlayout?hl=ko#2.0.0)

        ```groovy
            dependencies {
                implementation 'androidx.constraintlayout:constraintlayout:2.0.1'
            }
        ```

    ### What you'll do

    - `ConstraintSet` 과 `MotionLayout` 을 사용해서 애니메이션 정의
    - Drag event 를 기반으로 한 애니메이션
    - `KeyPosition` 으로 애니메이션 변경
    - `KeyAttribute` 로 속성값 변경
    - 코드로 애니메이션 실행
    - `MotionLayout` 으로 접히는 header 애니메이션 실행

    ### What you'll need

    - [Android Studio 4.0](https://developer.android.com/studio/preview) (The `MotionLayout` editor only works with this version of Android Studio.)

- 2. Getting Started

    **Motion Editor 를 사용 하려면 4.2 canary 버전의 Android Studio를 사용하는 것을 권장합니다.** 

    이 코드 랩은 Android Studio 4.0 이상에서 완료 할 수 있지만 Motion Editor에서 UI가 일치하지 않을 수 있습니다.

    [Download Zip](https://github.com/googlecodelabs/motionlayout/archive/master.zip)

    ```
    $ git clone [https://github.com/googlecodelabs/motionlayout.git](https://github.com/googlecodelabs/motionlayout.git)
    ```

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled.png)

- 3. Creating animations with MotionLayout

    먼저 사용자가 클릭 했을 때, 화면 상단 부터 하단까지 이동하는 애니메이션을 빌드할 것입니다.

    이 단계의 시작 코드에는 나중에 추가할 몇가지 중요한 요소가 누락되어 있습니다. 이때문에 MotionLayout은 화면을 올바르게 표시하지 않을 수 있으며, 빈 화면이 나타나거나 이 단계를 완료할 때까지 crash가 발생할 수 있습니다. 

    Starter code에서 애니메이션을 만들려면 다음 단계가 필요합니다. 

    - `MotionLayout` 은 `ConstrainLayout`의 하위 클래스입니다. `MotionLayout` 태그 내에서 애니메이션 할 모든 뷰를 지정합니다.
    - `MotionScene` : `MotionLayout`의 애니메이션을 설명하는 xml 파일입니다.
    - `Transition` : 애니메이션 지속 시간, Trigger 및 View 이동 방법을 특정하는 `MotionScene`의 일부분
    - `ConstraintSet` : Transition 의 **시작**과 **끝** Constraint 지정

    차례로 살펴보겠습니다.

    ### Step 1: Explore the existing code

    `MotionLayout`은 `ConstrainLayout`의 하위 클래스여서, 애니메이션을 추가하는 동안 동일하게 모든 기능을 지원합니다. `MotionLayout`을 사용하려면 `ConstraintLayout` 을 사용하는 View에 `MotionLayout` 을 추가합니다.

    1. `res/layout` 폴더 아래서 `activity_step1.xml` 을 엽니다. 

        `ConstraintLayout`안에 tint 가 적용되어 있는 별 `ImageView`가 있습니다. 

    **activity_step1.xml**

    ```xml
    <!-- initial code -->
    <androidx.constraintlayout.widget.ConstraintLayout
           ...
           android:layout_width="match_parent"
           android:layout_height="match_parent"
           >

       <ImageView
               android:id="@+id/red_star"
               ...
       />

    </androidx.constraintlayout.motion.widget.MotionLayout>
    ```

    여기 `ConstraintLayout` 에는 constraint 가 걸려 있지 않습니다. 지금 앱을 실행하게 되면 별 이미지가 레이아웃에서 알 수 없는 위치에 배치된 것을 의미합니다. 안드로이드 스튜디오는 constraint 부족한 것에 대해 경고를 알려 줄 것 입니다. 

    ### Step 2: Convert to Motion Layout

    `MotionLayout` 으로 애니메이션을 하기 위해서는, `ConstraintLayout`을 `MotionLayout` 으로 바꿔야 합니다. 

    이것은 Motion scene 을 사용하기 위한 단계 입니다. 

    1. 디자인 화면을 엽니다. Android Studio 4.0 에서 레이아웃xml 파일을 볼 때 오른쪽 상단에 있는 분할 또는 디자인 아이콘을 사용해서 디자인 화면을 여십시오.

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%201.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%201.png)

    2. 디자인 화면을 열면 미리보기를 마우스 오른쪽 단추로 클릭하고 **Convert to MotionLayout** 을 선택 합니다.

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%202.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%202.png)

    이렇게 하면 `ConstraintLayout` 태그가 `MotionLayout` 태그로 대체되고 `app:layoutDescription = @xml/activity_step1_scene` 이 `MotionLayout` 태그에 추가됩니다. 

    **activity_step1.xml**

    ```xml
    <!-- explore motion:layoutDescription="@xml/activity_step1_scene" -->
    <androidx.constraintlayout.motion.widget.MotionLayout
           ...
           app:layoutDescription="@xml/activity_step1_scene">
    ```

    **Motion scene** 은 `MotionLayout` 의 애니메이션을 설명하는 xml 파일입니다.

    `MotionLayout` 으로 변환하게 되면 화면에 바로 Motion Editor 가 표시됩니다.

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%203.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%203.png)

    Motion Editor 에는 세가지 UI 요소가 있습니다.

    1. **Overview** - 애니메이션의 다른 부분을 선택하게 해주는 선택 창입니다. 이 이미지 안에서는 `Start` `ConstraintSet` 이 선택됩니다. 또는 `Start`와 `End` 사이의 transition 을 선택할 수도 있습니다. 
    2. **Selection** - Overview 아래에는 Overview 아래에서 선택된 아이템에 따라 변경되는 섹션 창이 있습니다. `Start` `ConstraintSet`에 대한 정보가 Selection Window 에 표시됩니다. 
    3. **Attribute** - 속성 패널은 현재 선택된 항목의 속성을 표시하며 편집할 수 있습니다. 이 이미지에서는 `Start ConstraintSet`에 대한 속성을 표시 해주고 있습니다. 

    ### Step 3: Define start and end constraints

    모든 애니메이션은 Start와 End으로 정의할 수 있습니다. Start에서는 애니메이션 이전의 화면을 설정하고, End 에서는 애니메이션이 완료된 후의 화면을 설정합니다. Start 와 End 상태 (시간 경과에 따라) `MotionLayout` 을 사용해서 애니메이션을 적용하는 방법을 알아봅니다. 

    `MotionScene`은 Start 와 End 상태를 정의하기 위해 `ConstraintSet` tag를 사용합니다. `ConstraintSet`은 말 그대로, View에 적용할 Constraint의 모음입니다. 여기에는 width, height 그리고 `ConstraintLayout` 의 constraint 가 포함됩니다. 또한 `alpha` 과 같은 속성이 포함합니다. 이것은 View 자체가 아니라 그 View 에 대한 constraint 만을 포함합니다. 

    `ConstraintSet`에 지정된 어떤 constraint 들은 레이아웃 파일에 지정된 constraint 를 override 합니다. 레이아웃과 `MotionScene` 에서 둘 다 constraint 를 지정하면 `MotionScene` 의 constraint 만 적용됩니다. 

    Constriant Set 에는 constraint 정보와 width, height, alpha, visibility 와 같은  레이아웃 정보만 포함됩니다. 여기에는 `TextView` 의 text 와 같은 View 특정 정보는 포함되지 않습니다. 

    이 단계에서는 화면의 맨 위에서 시작해서 맨 아래 끝에서 끝나도록 별 이미지를 애니메이션 할 것입니다. Motion Editor 를 사용하거나 `activity_step1_scene.xml` 의 텍스트를 직접 편집해서 이 단계를 완료할 수 있습니다.

    1. Overview에서 `start` ConstraintSet 을 선택합니다. 

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%204.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%204.png)

    2. **Selection** 패널에서 `red_star`를 선택합니다. 현재 레이아웃의 Source 를 보여줍니다. 이것은 red_star 가 `ConstraintSet`에서 아직 constraint 가 설정되지 않았다는 것을 의미합니다. 오른쪽 위의 연필 아이콘을 눌러 **Create Constraint** 를 선택합니다.

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/f9564c574b86ea8.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/f9564c574b86ea8.gif)

    3. Overview 에서 `Start` `ConstraintSet`을 선택한 경우 `red_star`의 시작 소스가 표시되는지 확인합니다.
    4. 속성 패널에서 `start` `ConstraintSet`의 `red_star` 를 선택한 상태에서 상단에 제약 조건을 추가하고 파란색 + 버튼을 눌러 시작합니다.

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%205.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%205.png)

    5. `xml/activity_step1_scene.xml` 을 열어서 이 constraint 조건에 대해 Motion Editor 가 생성한 코드를 확인합니다.

        **activity_step1_scene.xml**

        ```xml
        <!-- Constraints to apply at the start of the animation -->
        <ConstraintSet android:id="@+id/start">
           <Constraint
                   android:id="@+id/red_star"
                   android:layout_width="wrap_content"
                   android:layout_height="wrap_content"
                   motion:layout_constraintStart_toStartOf="parent"
                   motion:layout_constraintTop_toTopOf="parent" />
        </ConstraintSet>
        ```

        `ConstraintSet`의 `id` 는 `@id/start` 이며, `MotionLayout`에서 모든 뷰에 적용할 모든 constraint 조건을 지정합니다. 이 `MotionLayout`에는 뷰가 하나만 있으므로 constraint가 하나만 필요합니다.

        `ConstraintSet` 내부의 `Constraint`는 `activity_step1.xml`에 정의된 `@id/red_star`를 포함하고 있는 뷰의 아이디로 지정합니다. `Constraint` 태그는 constraint 와 레이아웃 정보에만 지정된다는 것이 중요합니다. `Constraint` 태그는 이것이 `ImageView`에 적용된 건지 알지 못합니다. 

        이 constraint는 width, height 및 `red_star`뷰를 부모의 맨 위 시작으로 제한하는데 필요한 두 가지 다른 constraint 를 지정합니다.

        1. OverView 패널에서 `end` ConstraintSet을 선택합니다. 

            ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%206.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%206.png)

        2. `end` `ConstraintSet`에서 `red_star`에 대한 `Constraint`를 추가하기 위해 이전과 동일한 단계를 따릅니다. 
        3. Motion Editor를 사용하여 이 단계를 완료하려면 파란색 + 버튼을 클릭해서 bottom 과 end 에 제약조건을 추가합니다. 

            ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%207.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%207.png)

        4. XML 코드는 다음과 같습니다. 

        **activitiy_step1_scene.xml**

        ```xml
        <!-- Constraints to apply at the end of the animation -->
        <ConstraintSet android:id="@+id/end">
           <Constraint
                   android:id="@+id/red_star"
                   android:layout_width="wrap_content"
                   android:layout_height="wrap_content"
                   motion:layout_constraintEnd_toEndOf="parent"
                   motion:layout_constraintBottom_toBottomOf="parent" />
        </ConstraintSet>
        ```

        `@id/start`와 마찬가지로 이 `ConstraintSet`에는 `@id/red_star`에 대한 단일 Constrain가 있습니다. 이번에는 그것을 화면 맨 아래 끝으로 constraint 를 연결합니다.

        `@id/start`, `@id/end`라고 이름 붙일 필요는 없지만, 그렇게 하면 편리합니다.

        `MotionLayout`을 사용할 때는 레이아웃 대신 Motion Scene XML 파일에서 애니메이션으로 표시되는 View의 Constraint을 지정해야 한다. 애니메이션이 되지 않는 모든 뷰는 Motion scene 대신 레이아웃의 constraint 가 적용됩니다.

        ### Step 4: Define a transition

        모든 `MotionScene`은 또한 적어도 하나의 Transition을 포함해야 합니다. Transition 은 시작부터 끝까지 하나의 애니메이션의 모든 부분을 정의합니다. Transition은 Transition을 위한 시작 및 종료 `ConstraintSet`을 지정해야 합니다. Transition은 애니메이션을 실행할 시간이나 View를 드래그해서 애니메이션을 만드는 방법 등 다른 방법으로 애니메이션을 수정하는 방법도 지정할 수 있습니다.

        [Transition](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout#transition) 은 `MotionScene`에서 하나의 애니메이션을 설명합니다.  애니메이션 도중 변화하는 모든 View, 애니메이션의 소요 시간, 애니메이션을 구동하기 위한 사용자 터치 처리 방법 등 `MotionLayout`에 대한 완전한 애니메이션 사양이 수록되어 있습니다. 

        `MotionScene`은 둘 이상의 애니메이션과 둘 이상의 `Trainsition` 을 가질 수 있습니다.

        Motion Editor 는 MotionScene 파일을 만들 때 기본적으로 우리를 위한 trainstion 을 생성합니다. 생성된 transition 을 보려면 `activity_step1_scene.xml` 파일을 열어서 확인합니다. 

        **activity_step1_scene.xml**

        ```xml
        <!-- A transition describes an animation via start and end state -->
        <Transition
           motion:constraintSetEnd="@+id/end"
           motion:constraintSetStart="@id/start"
           motion:duration="1000">
          <KeyFrameSet>
          </KeyFrameSet>
        </Transition>
        ```

        이것이 `MotionLayout` 에서 애니메이션을 빌드하는데 필요한 모든 것입니다. 각 속성을 살펴봅시다.

        - `constraintSetStart` 애니메이션이 시작될 때 뷰에 적용됩니다.
        - `constraintSetEnd` 애니메이션이 끝날 때 뷰에 적용됩니다.
        - `dusraion` 애니메이션이 걸리는 시간(ms)를 지정합니다.

        `MotionLayout`은 시작 및 끝 constraint 사이의 경로를 파악하고 지정된 시간 동안 애니메이션을 적용합니다. 

        ### Step 5: Preview animation in Motion Editor

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/dff9ecdc1f4a0740.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/dff9ecdc1f4a0740.gif)

        **애니메이션** : Motion Editor 에서 transition preview 재생

        1. Motion Editor 를 열고 overview 패널에서 `start` 와 `end` 사이의 화살표를 클릭하여 transition 을 선택합니다. 

            ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%208.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%208.png)

        2. Transition이 선택되면 **Selection** 패널에서 playback control과 scrub bar 가 보여집니다. 재생을 클릭하거나 현재 위치를 드래그 해서 애니메이션을 미리 봅니다. 

            ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%209.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%209.png)

    ### Step 6: Add an on click handler

    애니메이션을 시작할 방법이 필요합니다. 방법 중 하나는 `MotionLayout`에서 `@id/red_star` 를 클릭한 이벤트의 응답을 처리하는 것입니다. 

    1. Motion Editor 를 열고 OverView 패널에서 Start 와 End 사이의 화살표를 클릭하여 Transition 을 선택합니다. 

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2010.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2010.png)

    2. Overview 패널 안에 있는 툴바 중에 **Create click or swipe handler** 를 클릭 합니다. 이것은 Transition 을 시작할 핸들러를 추가해 주는 것입니다. 

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2011.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2011.png)

    3. 팝업에서 **Click handler** 를 선택하십시오

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2012.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2012.png)

    4. **View to Click** 항목에서 `red_star` 로 변경합니다

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2013.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2013.png)

    5. **Add** 를 클릭하면 Motion Editor 에서 Transition 이 작은 점으로 표시됩니다. 

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2014.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2014.png)

    6. Overview패널에서 Transition 을 선택한 상태에서, 속성 패널에서 방금 추가한 OnClick 핸들러에 Transition 의 `toggle`의 `clickAction` 속성을 추가합니다.

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2015.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2015.png)

    7. `activity_step1_scene.xml` 을 열고 Motion Editor 에서 생성된 코드를 확인합니다.

        **activity_step1_scene.xml**

        ```xml
        <!-- A transition describes an animation via start and end state -->
        <Transition
            motion:constraintSetStart="@+id/start"
            motion:constraintSetEnd="@+id/end"
            motion:duration="1000">
            <!-- MotionLayout will handle clicks on @id/red_star to "toggle" the animation between the start and end -->
            <OnClick
                motion:targetId="@id/red_star"
                motion:clickAction="toggle" />
        </Transition>
        ```

    `Transition` 은 `MotionLayout`에게 `<OnClick>` tag 를 사용해서 클릭이벤트에 응답해서 애니메이션을 실행하도록 지시합니다. 각 특성을 확인해봅니다. 

    - `TargetId`는 Click을 보기 위한 View 입니다.
    - `toggle` 의 `clickAction` 은 클릭 시 Start 와 End 상태를 전환합니다. 다른 옵션을 [문서](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout#onclick-optional)를 참고해 주세요.

    8.  코드를 실행하고 **step 1** 을 클릭한 다음 빨간색 별을 클릭하고 애니메이션을 확인하세요.

    레이아웃 파일에서 start 또는 end를 가리키는 기존의 `ConstraintLayout`에서 `ConstraintSet`을 로드할 수 있습니다.

    ### Step 7: Animations in action

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/7ba88af963fdfe10.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/7ba88af963fdfe10.gif)

    앱을 실행하세요. 별을 클릭하면 애니메이션이 실행되는 것을 볼 수 있습니다. 

    완료된 motion scene 파일은 시작과 끝 `ConstraintSet`을 가리키는 하나의 `Transition`을 정의합니다. 

    애니메이션이 시작될 때 (`@id/start`), 별 아이콘은 화면의 맨 위에서 시작하게 제약(Constraint)이 걸려 있습니다. 애니메이션이 끝날 때(`@id/end`) 별 아이콘은 화면의 맨 끝 바닥에 위치하게 제약(Constraint)가 걸려 있습니다. 

    완성된 Motion scene 파일은 시작과 끝 ConstraintSet을 가리키는 Transition 을 정의합니다.

    ```xml
    <?xml version="1.0" encoding="utf-8"?>

    <!-- Describe the animation for activity_step1.xml -->
    <MotionScene xmlns:app="http://schemas.android.com/apk/res-auto"
                xmlns:android="http://schemas.android.com/apk/res/android">
       <!-- A transition describes an animation via start and end state -->
       <Transition
               motion:constraintSetStart="@+id/start"
               motion:constraintSetEnd="@+id/end"
               motion:duration="1000">
           <!-- MotionLayout will handle clicks on @id/star to "toggle" the animation between the start and end -->
           <OnClick
                   motion:targetId="@id/red_star"
                   motion:clickAction="toggle" />
       </Transition>

       <!-- Constraints to apply at the end of the animation -->
       <ConstraintSet android:id="@+id/start">
           <Constraint
                   android:id="@+id/red_star"
                   android:layout_width="wrap_content"
                   android:layout_height="wrap_content"
                   motion:layout_constraintStart_toStartOf="parent"
                   motion:layout_constraintTop_toTopOf="parent" />
       </ConstraintSet>

       <!-- Constraints to apply at the end of the animation -->
       <ConstraintSet android:id="@+id/end">
           <Constraint
                   android:id="@+id/red_star"
                   android:layout_width="wrap_content"
                   android:layout_height="wrap_content"
                   motion:layout_constraintEnd_toEndOf="parent"
                   motion:layout_constraintBottom_toBottomOf="parent" />
       </ConstraintSet>
    </MotionScene>
    ```

- 4. Animating based on drag events

    마지막 세션은 MotionLayout 및 Motion Editor 에 대한 소개로 사용되었습니다. 이 코드랩의 나머지 단계는 xml 에 초첨을 맞출 것입니다. 

    Motion Editor 를 사용하여 코드랩을 완료할 수도 있으며, MotionEditor 의 새로운 UI 요소가 이와 같이 팁에서 호출됩니다. 

    이 단계에서는 애니메이션을 실행하기 위해서 사용자 드래그 이벤트 (사용자가 화면을 스와이프 할 때) 응답하는 애니메이션을 빌드합니다. `MotionLayout` 은 뷰를 이동하기 위한 터치 이벤트 추적과 모션을 유동적으로 만들기 위한 물리 기반 fling 제스처를 지원합니다. 

    모션 에디터는 현재 UI를 통한 체인 생성을 지원하지 않습니다. 대체 솔루션은 다음과 같습니다.

    - Left start connect to start+top of parent, margin 32dp
    - Right star connected to end + top of parent, margin 32dp
    - Red star connected center in parent, top of parent, margin 32dp

    ### Step 1: Inspect the initial code

    1. 시작하려면 기존 `MotionLayout` 이 있는 레이아웃 파일 `activity_step2.xml` 을 여십시오. 코드를 봅시다.

        **activity_step2.xml**

        ```xml
        <!-- initial code -->

        <androidx.constraintlayout.motion.widget.MotionLayout
               ...
               motion:layoutDescription="@xml/step2" >

           <ImageView
                   android:id="@+id/left_star"
                   ...
           />

           <ImageView
                   android:id="@+id/right_star"
                   ...
           />

           <ImageView
                   android:id="@+id/red_star"
                   ...
           />

           <TextView
                   android:id="@+id/credits"
                   ...
                   motion:layout_constraintTop_toTopOf="parent"
                   motion:layout_constraintEnd_toEndOf="parent"/>
        </androidx.constraintlayout.motion.widget.MotionLayout>
        ```

        이 레이아웃은 애니메이션에 대한 모든 view 를 정의합니다. 3개의 별 아이콘은 Motion Scene 에서 애니메이션 되기 때문에 레이아웃에서 제한(Constraint)되지 않습니다.

        credits `TextView`는 전체 애니메이션에 대해 동일한 위치에 유지되고 속성을 수정하지 않기 때문에 constraint 가 적용됩니다. 

    `MotionLayout` 으로 애니메이션 되지 않은 뷰는 레이아웃 xml 파일에 Constraint 를 지정해야 합니다. `MotionLayout` 은 `<MotionScene>`의 `<Constraint>`  참조하지 않는 Constraint 는 수정하지 않습니다. 

    애니메이션 된 뷰에는 MotionScene xml 파일에서 설정한 constraint 가 있어야 합니다.

    ### Step 2: Animate the scene

    마지막 애니메이션과 마찬가지로, 애니메이션을 start 와 end 의 `ConstraintSet`, `Transition` 으로 정의할 예정입니다. 

    **start ConstraintSet 정의**

    1. 애니메이션을 정의하려면 Motion scene `xml/step2.xml` 파일을 여십시오.
    2. `Start` constriant 에 대한 constraint를 추가합니다. start에는 3개의 별이 화면 아래 중심에 맞춰져 있습니다. 좌우 별의 `알파값`은 `0.0`으로 완전히 투명하고 숨겨져 있습니다.

    **step2.xml**

    ```xml
    <!-- TODO apply starting constraints --><!-- Constraints to apply at the start of the animation -->
    <ConstraintSet android:id="@+id/start">
       <Constraint
               android:id="@+id/red_star"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               motion:layout_constraintStart_toStartOf="parent"
               motion:layout_constraintEnd_toEndOf="parent"
               motion:layout_constraintBottom_toBottomOf="parent" />

       <Constraint
               android:id="@+id/left_star"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:alpha="0.0"
               motion:layout_constraintStart_toStartOf="parent"
               motion:layout_constraintEnd_toEndOf="parent"
               motion:layout_constraintBottom_toBottomOf="parent" />

       <Constraint
               android:id="@+id/right_star"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:alpha="0.0"
               motion:layout_constraintStart_toStartOf="parent"
               motion:layout_constraintEnd_toEndOf="parent"
               motion:layout_constraintBottom_toBottomOf="parent" />
    </ConstraintSet>
    ```

    이 `ConstraintSet`에서는 각 별에 대한 `Constraint` 를 정해줍니다. 각각의 constraint 는 애니메이션 시작 시 `MotionLayout` 에 의해 적용됩니다. 

    각 별 View 들은 Start 및 End, Bottom constraint 를 사용해서 화면 바닥의 중앙에 위치합니다. 좌우 별 (`@id/left_star`, `@id/right_star`) 는 둘 다 보이지 않게 하는 추가 알파 값이 있으며 애니메이션 시작 시 적용됩니다.

    `Start` 및 `End` ConstraintSet은 애니메이션의 시작과 끝을 정의합니다. 시작에 대한 `motion:layout_constraintStart_toStartOf` 제약은 뷰의 시작을 다른 뷰의 시작으로 제한합니다. 이름 때문에 처음에는 혼란스러울 수 있습니다. `start` 를 constraint 의 context 로 양쪽에서 사용하고 있기 때문입니다. 구분하기 위해, `layout_constraintStart` 의 `start`는 View 의 시작을 의미하고 - 왼쪽→ 오른쪽 방향으로 언어를 사용한다면 "왼쪽", 오른쪽 → 왼쪽 방향의 언어를 사용한다면 "오른쪽"을 의미합니다. `start` constraint set 은 애니메이션의 시작을 의미합니다. 

    `Constraint` 에서 alpha 값을 지정할 수 있습니다. `0.0`은 완전히 투명하고 `1.0`은 완전히 불투명하게 표시되는 뷰의 투명성을 결정합니다.

    두 알파 값 사이를 애니메이션할 때, 모션 레이아웃은 부드럽게 전환해줍니다. 예를 들어 `alpha="0.0"` 과 `alpha="1.0"` 사이에서 애니메이션하면 `MotionLayout` 은 페이드인 효과를 생성합니다. 

    **end ConstraintSet 정의**

    1. [체인](https://developer.android.com/training/constraint-layout#constrain-chain)을 사용하여 `@id/credits` 아래에 있는 새 별을 모두 함께 배치하려면 end Constraint 를 정의합니다. 또한 좌우 별 `알파` 값을 `1.0`으로 설정합니다. 

    **step2.xml**

    ```xml
    <!-- TODO apply ending constraints --><!-- Constraints to apply at the end of the animation -->
    <ConstraintSet android:id="@+id/end">

       <Constraint
               android:id="@+id/left_star"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:alpha="1.0"
               motion:layout_constraintHorizontal_chainStyle="packed"
               motion:layout_constraintStart_toStartOf="parent"
               motion:layout_constraintEnd_toStartOf="@id/red_star"
               motion:layout_constraintTop_toBottomOf="@id/credits" />

       <Constraint
               android:id="@+id/red_star"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               motion:layout_constraintStart_toEndOf="@id/left_star"
               motion:layout_constraintEnd_toStartOf="@id/right_star"
               motion:layout_constraintTop_toBottomOf="@id/credits" />

       <Constraint
               android:id="@+id/right_star"
               android:layout_width="wrap_content"
               android:layout_height="wrap_content"
               android:alpha="1.0"
               motion:layout_constraintStart_toEndOf="@id/red_star"
               motion:layout_constraintEnd_toEndOf="parent"
               motion:layout_constraintTop_toBottomOf="@id/credits" />
    </ConstraintSet>
    ```

    최종 결과는 애니메이션 될 때, 뷰가 중앙에서 위로 펼쳐지는 것입니다. 

    두 `ConstraintSet` 모두 `alpha` 속성이 `@id/right_start` 및 `@id/left_star`에 설정되어 있으므로 애니메이션이 진행됨에 따라 두 뷰가 모두 fade in 됩니다.

    **Animating based on user swipe**

    `MotionLayout`은 사용자 드래그 이벤트 또는 스와이프를 추적하여 물리기반 "fling" 애니메이션을 만들 수 있습니다. 즉 사용자가 뷰를 fling 하면 뷰가 계속 진행되며 물리적 물체가 표면을 굴러가는 것처럼 속도가 느려집니다. `Trainstion` 에서 [`OnSwipe`](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout#onswipe-optional) 태그를 사용하여 이러한 유형의 애니메이션을 추가할 수 있습니다. 

    1. TODO 를 `OnSwipe` 태그로 교체하기 위해서 

        `<OnSwipe motion:touchAnchorId="@id/red_star" />`. 를 추가해주세요.

    **step2.xml**

    ```xml
    <!-- TODO add OnSwipe tag --><!-- A transition describes an animation via start and end state -->
    <Transition
           motion:constraintSetStart="@+id/start"
           motion:constraintSetEnd="@+id/end">
       <!-- MotionLayout will track swipes relative to this view -->
       <OnSwipe motion:touchAnchorId="@id/red_star" />
    </Transition>
    ```

    `OnSwipe` 에는 몇가지 속성이 포함되어 있으며, 가장 중요한 것은 `touchAchorId`입니다.

    - `touchAchorId` 는 터치에 반응하여 이동하는 뷰를 추적합니다. `MotionLayout` 은 이 뷰를 손가락으로 swiping 으로 부터 같은 거리에 뷰의 위치를 유지시켜줍니다.
    - `touchAnchorSide`는 뷰의 어느 쪽을 추적해야하는지 결정합니다. 이것은 뷰의 크기를 조정하거나, 복잡한 경로를 따르거나 다른 한 쪽이 다른 쪽보다 빠르게 이동하는 경우에 중요합니다.
    - `DragDirection` 은 애니메이션의 방향을 결정합니다. (위, 아래, 왼쪽, 오른쪽)

    `MotionLayout` 에서 드래그 이벤트를 리스닝할때, 리스너는 `touchAnchorId`가 지정한 뷰가 아닌 `MotionLayout` 뷰에 등록됩니다. 사용자가 화면 아무 곳에서나 제스처를 시작할 때 `MotionLayout` 은 손가락과 `touchAnchorld` 뷰의 `touchAnchorSide` 사이의 거리를 일정하게 유지합니다. 예를 들어 앵커에서 100dp 떨어진 곳을 터치하면, `MotionLayout`은 손가락에서 100dp 떨어진 곳에서 애니메이션을 재생합니다. 

    `OnSwipe`는 `touchAchorId`에 지정된 뷰가 아닌 `MotionLayout`에서 swipe 를 수신합니다. 이는 사용자가 애니메이션을 실행하기 위해서 지정된 뷰 밖에서 swipe 할 수 있다는 것을 의미합니다. 

    ### Try it out

    1. 앱을 다시 실행하고 step2 화면을 엽니다. 애니메이션을 볼 수 있을 것입니다.
    2. `MotionLayout` 이 유체물리 기반의 애니메이션을 어떻게 표시하는지 알아보려면 애니메이션 중간에 손가락을 놓거나 fling" 해서 살펴보세요

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/fefcdd690a0dcaec.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/fefcdd690a0dcaec.gif)

    `MotionLayout` 은 풍부한 효과를 만들기 위해 `ConstraintLayout` 의 특징을 사용해서 매우 다른 디자인 사이에서 애니메이션을 만들 수 있습니다. 

    이 애니메이션에서는 세개의 뷰가 모두 시작할 때는 화면 하단에 배치됩니다. 마지막에, 세개의 뷰는 체인의 `@id/credits`의 상대적으로 위치합니다.

    이렇게 매우 다른 레이아웃에도 불구하고, `MotionLayout`은 시작과 끝 사이에 유연한 애니메이션을 만들어 줍니다.

- 5. Modifying a path

    이 단계에서는 애니메이션 도중에 복잡한 경로를 따라가면서 모션 중에 credits을 애니메이션으로 만들 것입니다. `MotionLayout` 은 `KeyPosition`을 사용하여 View 가 시작과 끝 사이의 경로를 수정할 수 있습니다. 

    ### Step 1: Explore the existing code

    1. `layout/activity_step3.xml` 과 `xml/step3.xml` 을 열어서 현재 레이아웃과 motion scene 코드를 확인합니다. `ImageView`와 `TextView` 는 달과 credits 텍스트를 표시합니다. 
    2. `xml/step3.xml` motion scene 파일을 엽니다. `@id/start` 에서 `@id/end` 로 `Transition`이 정의되어 있는 것을 볼 수 있습니다. 애니메이션은 달 이미지를 화면 왼쪽 하단에서 오른쪽 하단으로 이동 시킵니다. Credit 텍스트는 달이 이동하면서 `alpha="0.0"` 에서 `alpha="1.0"`으로 fade in 됩니다. 
    3. 앱을 실행해서 **step3**를 선택합니다. 

        달을 클릭하면 달이 처음부터 끝까지 직선으로 움직이는 것을 볼 수 있습니다. 

    ### Step 2: Enable path debugging

    달의 움직임을 추가 하기 전에 모션 레이아웃에서 path debugging을 활성화 하면 도움이 됩니다.

    `MotionLayout` 으로 복잡한 애니메이션을 개발하는데 도움이 되도록 모든 뷰의 애니메이션 경로를 그릴 수 있습니다. 이것은 애니메이션을 시각화 하고 모션의 작은 세부 사항을 미세 조정하려는 경우에 유용합니다.

    Transition을 재생하는 동안 컨트롤을 누른 상태에서 디자인 화면에서 SHOW_PATH를 수행할 수도 있습니다. 

    1. Path Debugging 을 활성화하기 위해서 `layout/activity_step3.xml` 을 열고, `app:motionDebug="SHOW_PATH"`를 `MotionLayout` 태그에 추가합니다. 

        **activity_step3.xml**

        ```xml
        <!-- Add motion:motionDebug="SHOW_PATH" -->

        <androidx.constraintlayout.motion.widget.MotionLayout
               ...
               app:motionDebug="SHOW_PATH" >
        ```

        경로 디버깅을 활성화 한 후, 앱을 다시 실행시키면 모든 뷰의 경로가 점선으로 시각화 된 것을 볼 수 있습니다. 

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2016.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2016.png)

    - **원**은 View 하나의 시작과 끝 위치를 나타냅니다.
    - **선**은 View 하나의 경로를 나타냅니다.
    - **다이아몬드**는 `KeyPosition` 경로를 수정하는 것을 나타냅니다.

    예를 들어 이 애니메이션에서 가운데 원은 credit 텍스트의 위치입니다.

    ### Step 3: Modify a path

    `MotionLayout`의 모든 애니메이션은 애니메이션을 시작하기 전과 완료된 후에 화면이 어떻게 생겼는지 정의하는 Start 와 End `ConstraintSet`에 의해 정의됩니다. 기본적으로 `MotionLayout`은 Start 와 End 포지션 사이의 변경되는 경로를 선형(직선)으로 표시합니다. 

    이 예제에서 달 이미지 arc 형태와 같은 복잡한 경로를 빌드하기 위해, `MotionLayout`은 `KeyPosition`을 사용하여 View가 시작과 끝 사이의 경로를 수정합니다.

    [Key Position](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout#keyposition)은 시작과 끝 `ConstraintSet` 사이에 뷰가 걸리는 path 를 수정합니다. 시작 위치와 종료 위치 사이의 세 번째(또는 네 번째 또는 다섯 번째) 지점을 통과하는 View의 경로를 왜곡할 수 있습니다. 또는 X 축 Y 축을 따라 진행속도를 높이거나 늦출 수도 있습니다. 

    `KeyPosition` 은 애니메이션 도중에만 경로를 변경할 수 있으며, 시작이나 끝을 변경할 수 없습니다. 

    `ConstraintSet`은 항상 애니메이션의 시작과 끝에서 View의 최종 위치를 결정합니다. 

    1. `xml/step3.xml` 을 열고 `keyPosition`을 Scene 에 추가합니다. `KeyPosition` 태그는 `Transition` 태그 내부에 배치됩니다. 

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2017.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2017.png)

    **step3.xml**

    ```xml
    <!-- TODO: Add KeyFrameSet and KeyPosition -->
    <KeyFrameSet>
       <KeyPosition
               motion:framePosition="50"
               motion:motionTarget="@id/moon"
               motion:keyPositionType="parentRelative"
               motion:percentY="0.5"
       />
    </KeyFrameSet>
    ```

    MotionEditor 에서 이 단계를 완료하려면 Overview 패널에서 Transition을 선택한 다음 이 비디오를 따르십시오.

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/2b567e19a9cad769.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/2b567e19a9cad769.gif)

    `KeyFrameSet` 은 `Transition`의 자식이며, Transition 중에 적용되어야 하는 `KeyPosition`과 같은 `KeyFrames` 의 집합입니다.

    `MotionLayout`은 달 이미지의 시작과 끝 경로를 계산하며, `KeyFrameSet`에 명시된 `KeyPosition`을 기반으로 경로를 수정합니다. 앱을 다시 실행하면 경로가 어떻게 수정되는지 알 수 있습니다. 

    `KeyPosition`은 경로를 어떻게 수정할 건지 표현할 수 있는 몇 가지 속성을 가지고 있습니다. 중요한 값은 다음과 같습니다.

    - `framePosition` 은 0과 100 사이의 숫자입니다. 애니메이션에서 이 `KeyPosition`이 적용되어야 하는데, 애니메이션에서는 1은 1%이고, 99가 99% 가 됩니다. 만약 50이라면 중간 값으로 적용할 수 있습니다.
    - `motionTarget`은 이 `KeyPosition`이 경로를 수정하는 View 입니다.
    - `keyPositionType` 은 이 `KeyPosition` 이 경로를 수정하는 방법입니다. 이것은 `parentRelative`, `pathRelative` 또는 `deltaRelative` 가 될 수 있습니다. (다음 단계에서 설명합니다.)
    - `percentX | percentY` 는 `framePosition`(0.0 과 1.0 사이의 값, 음의 값과 values > 1 값이 허용) 에서 얼마나 경로를 수정하는 지 정도를 말합니다.

    **이렇게 생각할 수 있습니다**. : `**framePosition`에서 `motionTarget`의 경로를 `keyPositionType` 이 결정한 좌표에 따라 `percentX` 또는 `percentY`로 이동해서 수정합니다.** 

    기본적으로 `MotionLayout`은 경로를 수정하여 모든 모서리를 둥글게 합니다. 방금 만든 애니메이션을 보면 달이 구부러진 경로를 따라가는 것을 볼 수 있습니다. 대부분의 애니메이션의 경우, 원하는 것이며, 만약 그렇지 않은 경우 `[curveFit](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout)` 속성을 지정하여 사용자 정의 할 수 있습니다.

     

    ### Try it out

    앱을 다시 실행하면 이 단계의 애니메이션이 표시됩니다.

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/46b179c01801f19e.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/46b179c01801f19e.gif)

    달이 arc 를 따라가는 것은 `Transition`에 명시된 `KeyPosition`을 통과하기 때문입니다. 

    ```xml
    <KeyPosition
           motion:framePosition="50"
           motion:motionTarget="@id/moon"
           motion:keyPositionType="parentRelative"
           motion:percentY="0.5"
    />
    ```

    `KeyPosition`을 다음처럼 읽을 수 있습니다. : `framePosition 50` (애니메이션 중간 지점) 에서 `parentRelative`(전체 `MotionLayout`)에 의해 결정된 좌표에 따라 `50% Y`를( 화면 아래쪽으로 절반 지점) 이동 하여 `motionTarget` 으로 지정되어 있는 `@id/moon` 의 경로를 수정합니다. 

    그래서, 애니메이션 중간 쯤에서, 달은 화면 상 50%아래 지점 `KeyPosition`을 통과해야 합니다. 이 `KeyPosition`은 X motion을 전혀 수정하지 않기 때문에, 달은 처음부터 끝까지 수평으로 움직입니다. `MotionLayout`은 시작과 끝을 오가며 `KeyPosition`을 통과하는 부드러운 경로를 알아낼 것입니다. 

    자세히 보면, credits 텍스트는 달의 위치에 의해 제약(constrainted)를 받습니다. (크레딧 텍스트가) 왜 수직으로는 움직이지 않을까요?

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/1c7cf779931e45cc.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/1c7cf779931e45cc.gif)

    ```xml
    <Constraint
           android:id="@id/credits"
           ...
           motion:layout_constraintBottom_toBottomOf="@id/moon"
           motion:layout_constraintTop_toTopOf="@id/moon"
    />
    ```

    달이 가는 경로를 수정 하더라도 달의 시작 위치와 끝 위치는 전혀 수직으로 움직이지 않습니다. `KeyPosition`은 credits 텍스트가 달의 마지막 끝 위치로 제한되도록, 시작 또는 끝 위치를 수정하지 않습니다. 

    Credits이 달과 함께 이동하도록 하려면, credits 에 `KeyPosition`을 추가하거나, `@id/credits` 에 대한 start constraint 를 추가하세요.

    Start 와 End constraint 는 `KeyPosition`에 의해 절대 수정되지 않습니다. 

    View가 `@id/moon`과 같은 복잡한 motion path 를 따르고 있더라도, start 와 end constraint 는 항상 start 또는 end 위치에 놓이게 됩니다. `@id/moon` 에 constraint 되는 다른 뷰는 그 사이의 경로를 따르지 않습니다. 

    다음 섹션에서 `MotionLayout`의 `keyPositionType` 의 다양한 타입에 대해서 알아봅니다. 

- 6. Understanding keyPositionType

    마지막 단계에서 `parentRelative`의 `keyPosition` 유형을 사용해서 경로를 화면의 50%로 offset 합니다. `keyPositionType`속성은 `MotionLayout` 이 `percentX` 또는 `percentY` 에 따라 경로를 어떻게 수정하는 방법을 결정합니다. 

    ```xml
    <KeyFrameSet>
       <KeyPosition
               motion:framePosition="50"
               motion:motionTarget="@id/moon"
               motion:keyPositionType="parentRelative"
               motion:percentY="0.5"
       />
    </KeyFrameSet>
    ```

    `keyPosition`은 세 가지 타입이 가능합니다 : `parentRelative`, `pathRelative`, `deltaRelative`. 타입을 지정하면 `percentX`와 `percentY`가 계산되는 좌표계(coordinate system)가 변경됩니다.

    ### What is a coordinate system?

    [coordinate system](https://en.wikipedia.org/wiki/Coordinate_system) 은 공간의 한 점을 지정하는 방법을 제공합니다. 화면의 위치를 설명 하는데도 유용합니다.

    `MotionLayout` coordinate system 는 직교 좌표계([cartesian coordinate system.](https://en.wikipedia.org/wiki/Cartesian_coordinate_system))입니다. 즉, 두 개의 수직선으로 정의 된 X 및 Y 축이 있습니다. 이들 간의 주요 차이점은 화면에서 X 축이가는 위치입니다 (Y 축은 항상 X 축에 수직입니다).

    `MotionLayout` 의 모든 좌표계는 X축과 Y축 모두에서 `0.0`과 `1.0` 사이의 값을 사용합니다. 음수 값과 `1.0` 보다 큰 값도 허용합니다. 예를 들어, `percentX` 값이 `-2.0`라면 x 축 반대 방향으로 두 번 이동합니다.

    이 모든 것은 Algebra(대수학) 클래스와 비슷하다면, 아래 그림을 확인하세요!.

    ### parentRelative coordinates

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2018.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2018.png)

    `parentRelative` 의 `keyPositionType`은 화면과 동일한 좌표계를 사용합니다. 전체 `MotionLayout` 의 왼쪽 상단에 `(0,0)` 오른쪽 아래에 `(1, 1)`로 정의합니다. 

    `parentRelative` 는 이 예제의 달 arc 처럼-  전체 `MotionLayout`을 통해 이동하는 애니메이션을 만들고 싶을 때마다 사용할 수 있습니다. 

    그러나 모션에 상대적인 경로를 수정 하려는 경우 (예: 약간 곡선으로 만들기) 다른 두 좌표계가 더 나은 선택입니다. 

    ### deltaRelative coordinates

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2019.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2019.png)

    Delta 는 변화를 뜻하는 수학 용어여서, `DeltaRelative`는 "change relative - 상대적 변화"를 나타냅니다. `deltaRelative` 좌표`(0, 0)`은 뷰의 시작 위치, `(1, 1)`은 종료 위치 입니다. X 축과 Y 축은 화면과 정렬 되어 있습니다. 

    X축은 화면에서는 항상 수평이고, Y 축은 화면에서는 항상 수직입니다. `parentRelative` 와 비교했을 때, 좌표는 뷰과 이동할 화면 부분만 설명한다는 것이 주된 차이점 입니다. 

    `deltiaRelative` 는 수평 또는 수직 motion을 분리하여 제어하기 위한 훌륭한 좌표계입니다. 예를 들어 수직(Y) 이동만 50%로 완료하고, 수평(X) 애니메이션을 계속하는 애니메이션을 만들 수 있습니다.

    `deltaRelative` 의 좌표는 뷰의 움직임을 기준으로 합니다.  따라서 뷰가 오른쪽으로 이동하면 X 가 오른쪽으로 이동합니다. 뷰가 왼쪽으로 이동하면 X 가 왼쪽으로 이동합니다. 마찬가지로 Y는 뷰를 따라 올라가거나 내려갑니다. 물론 뷰가 시작 또는 정지 위치를 지나 튀도록(bounce) 하려면 항상 음수 값이나 1.0 보다 큰 값을 사용할 수 있습니다.

    `deltaRelative`의 좌표는 뷰가 X와 Y 방향으로 모두 이동하는 거리에 따라 확장되거나 축소됩니다. 그래서 만약 별로 움직이지 않는, 또는 한 방향으로 전혀 움직이지 않는 View 를 가지고 있다면, `deltaRelative` 는 그 방향으로 사용할 좌표계를 만들 수 없습니다. 예를 들어 오른쪽에서 왼쪽으로 수평으로 이동하는 뷰는 `deltaRelative` 에서 Y축을 가질 수 없습니다.

    ### pathRelative coordinates

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2020.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2020.png)

    `MotionLayout`의 마지막 좌표계는 `pathRelative` 입니다. X 축이 motion path 를 처음부터 끝까지 따라 감으로서, 다른 두 개와는 꽤 다릅니다. 그래서 `(0, 0)`은 시작 위치, `(1, 0)`은 종료 위치 입니다.

    왜 이걸 쓰나요? 특히 이 좌표계가 화면 좌표계와 정렬 되어 있지 않기 때문에, 언뜻 보기에는 상당히 놀랍습니다. 

    `pathRelative` 는 몇가지 경우에 상당히 유용합니다.

    - **애니메이션 일부에서, 속도 증가, 속도 감소 또는 중지**

        X dimension 은 항상 View 의 path 와 일치하므로, `pathRelative` `KeyPosition`을 사용하여 해당 경로에서 특정 지점에 도달하는 프레임을 변경할 수 있습니다. 따라서 `KeyPosition` `framePosition="50"`와 `percentX="0.1"` 는 모션의 처음 10%를 이동하는데 50%의 시간을 사용합니다. 

    - **경로에 subtle arc 추가**

        Y dimension은 항상 모션에 수직이기 때문에, Y를 변경하면 전체 모션을 기준으로 곡선 경로가 변경됩니다.

    - **`deltaRelative` 가 작동하지 않을 때 두 번째 dimension을 추가합니다.**

        완전한 수평 또는 수직 motion의 경우, `deltaRelative` 는 하나의 유용한 차원(dimension)만 생성합니다. 그러나, `pathRelative` 는 항상 사용 가능한 X 좌표와 Y좌표를 생성합니다. 

    `pathRelative` 는 항상 화면이 아닌 motion의 측면에서 좌표계를 정의한다는 점에 유의해야 합니다. 이것은 전체 화면에 비스듬한 각도로 있을 수 있음을 의미합니다. 화면 좌표 측면에서 수평 또는 수직 동작을 수정해야 하는 경우 다른 좌표계 중 하나가 더 나은 선택입니다. 

    다음 단계에서는 둘 이상의 `KeyPosition`을 사용해서 훨씬 더 복잡한 경로를 작성하는 방법을 배웁니다.

- 7. Building complex paths

    마지막 단계에서 만든 애니메이션을 보면, 부드러운 곡선이 만들어 지면서 모양은 더 "달처럼"보일 수 있습니다.

    ### Modify a path with multiple KeyPosition elements

    `MotionLayout` 은 모션을 얻기 위해 필요한 만큼의 `KeyPosition`을 정의함으로써 경로를 더 수정할 수 있습니다. 이 애니메이션을 위해서 arc를 만들겠지만, 원한다면 달을 화면 중앙에서 위 아래로 점프하게 할 수 있습니다. 

    1. `xml/step4.xml` 을 엽니다. 마지막 단계에서 추가한 `KeyFrame` 과 뷰가 동일한지 확인합니다.
    2. 곡선의 상단을 둥글게 하려면, `@id/moon` 의 경로에 `KeyPositions` 를 두 개 더 추가하고, 하나는 위에 도달하기 직전에 하나는 그 다음에 추가합니다. 

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2021.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2021.png)

    **step4.xml**

    ```xml
    <!-- TODO: Add two more KeyPositions to the KeyFrameSet here -->
    <KeyPosition
           motion:framePosition="25"
           motion:motionTarget="@id/moon"
           motion:keyPositionType="parentRelative"
           motion:percentY="0.6"
    />
    <KeyPosition
           motion:framePosition="75"
           motion:motionTarget="@id/moon"
           motion:keyPositionType="parentRelative"
           motion:percentY="0.6"
    />
    ```

    이러한 `KeyPosition`은 애니메이션 경로의 25%와 75%로 적용되며, `@id/moon`은 화면 상단에서 60% 떨어진 경로를 따라 이동하게 됩니다. 기존 `KeyPosition`과 50% 합쳐져서 달이 따라갈 수 있는 부드러운 원호가 생성됩니다. 

    `MotionLayout` 에서는 원하는 이동 경로를 얻는데 필요한 만큼의 `KeyPosition`을 추가할 수 있습니다. `MotionLayout` 은 각 `KeyPosition`을 지정된 `framPosition`에 적용하고, 모든 `KeyPositions`를 통과하는 부드러운 모션을 만드는 방법을 알아냅니다. 

    `KeyPosition`은 항상 `View`가 처음부터 끝까지 이동해야 하는 `(x, y, width, height)` 위치를 정의합니다.

    하나의 치수를 지정하지 않으면 치수는 기본값(0 또는 `framePosition`에 기반한 적절한 값)이 됩니다. 이 예제에서 `percentY`만 지정하면 `percentX`는 해당 키 위치에 대한 기본값을 유지합니다. 

    ### Try it out

    1. 앱을 다시 실행해서 작동 중인 애니메이션을 보려면 **step4**로 이동합니다. 

        달을 클릭하면 `KeyFrameSet`에 지정된 각 `KeyPosition`을 거치며 시작 부터 끝까지 경로를 따라갑니다. 

    여러 `KeyPosition` 태그로 경로를 수정하면 복잡한 모션을 만들 수 있습니다.  

    호를 만들거나, 날카로운 모서리를 구성하거나, View 를 bounce 시키거나, 처음부터 끝까지 이동 시킬 수 있습니다. `MotionLayout`을 사용하면 동일한 경로에 여러 `KeyPosition`을 적용할 수 있으므로 View가 처음부터 끝까지 수행하는 경로를 극적으로 수정할 수 있습니다. 

    ### Explore on your own

    다른 유형의 `KeyFrame`으로 이동하기 전에 `KeyPositions`를 `KeyFrameSet`에 추가하여 `KeyPositions`를 사용하여 어떤 효과를 만들 수 있는지 확인합니다.

    애니메이션 도중 앞 뒤로 이동하는 복잡한 경로를 구현하는 방법을 보여주는 한 가지 예 입니다.

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2022.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2022.png)

    **step4.xml**

    ```xml
    <!-- Complex paths example: Dancing moon -->
    <KeyFrameSet>
       <KeyPosition
               motion:framePosition="25"
               motion:motionTarget="@id/moon"
               motion:keyPositionType="parentRelative"
               motion:percentY="0.6"
               motion:percentX="0.1"
       />
       <KeyPosition
               motion:framePosition="50"
               motion:motionTarget="@id/moon"
               motion:keyPositionType="parentRelative"
               motion:percentY="0.5"
               motion:percentX="0.3"
       />
       <KeyPosition
               motion:framePosition="75"
               motion:motionTarget="@id/moon"
               motion:keyPositionType="parentRelative"
               motion:percentY="0.6"
               motion:percentX="0.1"
       />
    </KeyFrameSet>
    ```

    `KeyPosition`을 탐색을 마치면, 다음 단계에서 다른 유형의 `KeyFrames` 로 이동합니다. 

- 8. Changing attribute during Motion

    동적으로 애니메이션을 구축한다는 것은 애니메이션이 진행됨에 따라 뷰의 `크기`, `회전` 또는 `알파(Alpha)`를 변경하는 것을 의미합니다. `MotionLayout`은 `[KeyAttribute](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout#keyattribute)` 를 사용하여 모든 뷰의 많은 [속성](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout#standard-attributes)을 애니메이션 할 때 지원합니다. 

    이 단계에서는 `KeyAttribute`를 사용하여 달 스케일을 만들고 회전합니다. 또한 `KeyAttribute` 을 사용하여 달이  거의 여행을 완료할 때까지 텍스트가 나타나는 것을 지연시킬 것입니다. 

    ### Step 1: Resize and rotate with KeyAttribute

    1. 마지막 단계에서 작성한 것과 동일한 애니메이션을 포함하는 `xml/step5.xml` 을 엽니다. 다양성을 위해 이 화면은 다른 사진을 배경으로 사용합니다.
    2. 달의 크기를 확장하고 회전 하려면, `keyFrame="50"` 과 `keyFrame="100"` `KeyFrameSet`에 두 개의 `KeyAttribute` 태그를 추가합니다.

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2023.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2023.png)

    **step5.xml**

    ```xml
    <!-- TODO: Add KeyAttributes to rotate and resize @id/moon -->

    <KeyAttribute
           motion:framePosition="50"
           motion:motionTarget="@id/moon"
           android:scaleY="2.0"
           android:scaleX="2.0"
           android:rotation="-360"
    />
    <KeyAttribute
           motion:framePosition="100"
           motion:motionTarget="@id/moon"
           android:rotation="-720"
    />
    ```

    Motion Editor 로 이 단계를 완료하려면, Overview 패널에서 Transition을 선택하고 `KeyPosition`을 추가한 것과 동일한 방법으로 `KeyAttribute` 를 추가합니다.

    시간 표시 막대에서 (다이아몬드) 를 클릭하고 Attribute 패널에서 편집하여 `KeyAttribute` 를 선택하면 동일한 `KeyAttribute`에 여러 속성을 추가할 수 있습니다.

    이러한 `KeyAttributes`는 애니메이션의 50%와 100% 로 적용됩니다. 50% 의 첫번째 `KeyAttributes` 는 호 상단에서 발생하며, -360도(또는 한번 전체 회전) 회전 뿐만 아니라 뷰의 크기가 두 배가 되도록 합니다. 두 번째 `KeyAttribute` 는 -720도(두번 전체 회전)로 두 번째 회전을 마치고 `ScaleX`와 `ScaleY` 값이 1.0으로 기본 설정되기 때문에 크기를 다시 원래대로 축소합니다.

    `KeyPosition`과 마찬가지로 `KeyAttribute` 는 `FramePosition` 및 `motionTarget`을 사용하여 `KeyFrame` 적용 시기와 수정할 View를 지정합니다. `MotionLayout` 은 유동적인 애니메이션을 만들기 위해 `KeyPositions` 사이를  보간(interpolate) 합니다. 

    `KeyAttributes` 는 모든 뷰에 적용 할 수 있는 [속성](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout#standard-attributes) 을 지원합니다. `visibility`, `alpha` 또는 `elevation`과 같은 기본 속성의 변경을 지원합니다. 여기서 한 것 처럼, 회전을 변경하거나, `RotateX`와 `RotateY`로 3차원으로 회전하거나 `ScaleX`와 `ScaleY`로 크기를 조정하거나 뷰의 위치를 X, Y, 또는 Z로 변환할 수도 있습니다.  

    단일 `KeyAttribute` 로 여러 속성을 동시에 수정할 수 있습니다. 이 애니메이션에서 `keyFrame="50"`의 `KeyAttribute` 는 `scaleX`, `scaleY`, `rotation`을 설정합니다. 세가지 속성 모두 `MotionLayout`에 의해 동시에 수정됩니다.

    ### Step 2: Delay the appearance of credits

    이 단계의 목표 중 하나는 애니메이션이 대부분 완료 될 때까지 크레딧 텍스트가 나타나지 않도록 애니메이션을 업데이트하는 것입니다.

    1. 크레딧이 나타나는 것을 지연 시키려면, `keyPosition="85"` 까지 `alpha` 가 0을 유지할 수 있도록 하는 `KeyAttribute` 를 하나 더 정의합니다. `MotionLayout` 은 여전히 0에서 100 alpha 로 부드럽게 전환되지만, 애니메이션 마지막 15% 에 걸쳐 실행될 것입니다. 

    **step5.xml**

    ```xml
    <!-- TODO: Add KeyAttribute to delay the appearance of @id/credits -->

    <KeyAttribute
           motion:framePosition="85"
           motion:motionTarget="@id/credits"
           android:alpha="0.0"
    />
    ```

    이 `KeyAttribute` 는 애니메이션의 처음 85% 동안 `@id/credits`의 `알파` 값을 0.0 으로 유지합니다. 알파 값은 0으로 시작하기 때문에, 이것은 애니메이션의 처음 85% 동안 보이지 않는 다는 것을 의미합니다. 

    이 `KeyAttribute` 의 최종 효과는 애니메이션의 마지막에 크레딧이 나타나는 것입니다. 이것은 화면 오른쪽 구석에 자리 잡은 달과 조화를 이루는 모습을 보여 줍니다.

    다른 뷰가 이와 같이 움직이는 동안 한 뷰에서 애니메이션을 지연시킴으로써 사용자에게 역동적인 느낌을 주는 인상적인 애니메이션을 만들 수 있습니다. 

    `KeyAttribute` 는 시작 위치나 종료 위치에서 뷰의 모양을 변경시키지 않습니다.

    뷰가 `framePosition="100"` (또는 애니메이션을 통해서 100%) 회전, 전환, 또는 스케일링 되는 경우 최종 값으로 "점프"됩니다. 시작 또는 종료 상태를 변경 하려면 `ConstraintSet` 에서 `Constraint`를 수정합니다. 

    ### Try it out

    1. 앱을 다시 실행한 후 **5단계**로 이동하여 애니메이션이 작동 하는지 확인합니다.  달을 클릭하면 처음부터 끝까지 경로를 따라가며 `KeyFrameSet` 에 지정된 각 `KeyAttribute` 를 통과합니다. 

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/2f4bfdd681c1fa98.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/2f4bfdd681c1fa98.gif)

    달을 두 개의 완전한 원으로 회전하기 때문에 이제 이중 백 플립을 수행하고 크레딧은 애니메이션이 거의 완료 될 때까지 나타나는 것이 지연됩니다.

    ### Explore on your own

    최종 유형의 `KeyFrame`으로 이동하기 전에 `KeyAttributes` 에서 다른 표준 [Attribute](https://developer.android.com/reference/android/support/constraint/motion/MotionLayout#standard-attributes) 를 수정해 보십시오. 예를 들어 `rotationX`로 `회전`을 변경하여 어떤 애니메이션을 생성 하는지 확인합니다. 

    다음은 시도 할 수있는 표준 속성 목록입니다.

    - `android:visibility`
    - `android:alpha`
    - `android:elevation`
    - `android:rotation`
    - `android:rotationX`
    - `android:rotationY`
    - `android:scaleX`
    - `android:scaleY`
    - `android:translationX`
    - `android:translationY`
    - `android:translationZ`

- 9. Changing custom attributes

    풍부한 애니메이션에는 뷰의 색상 또는 기타 속성 변경이 포함됩니다. `MotionLayout`은 `KeyAttribute`를 사용하여 이전 작업에 나열된 표준 속성을 변경할 수 있지만, 다른 속성을 지정하려면 `CustomAttribute`를 사용하세요. 

    `CustomAttribute`는 setter가 있는 값을 설정하는데 사용될 수 있습니다. 예를 들어 `CustomAttribute`를 사용해서 뷰에서 [backgroundColor](https://developer.android.com/reference/android/view/View#setBackgroundColor(int))을 설정할 수 있습니다. `MotionLayout`은 [reflection](https://en.wikipedia.org/wiki/Reflection_(computer_programming))을 사용해서 setter 를 찾은 다음, 뷰를 애니메이션화 하기 위해서 반복적으로 호출합니다. 

    이 단계에서는 `CustomAttribute`를 사용해서 달에 `colorFilter` 속성을 설정하여 아래의 애니메이션을 빌드합니다.

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/5fb6792126a09fda.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/5fb6792126a09fda.gif)

    Motion Editor 에서 사용자 정의 속성을 추가하려면, 먼저 KeyAttribute를 만든 다음 속성 패널에서 편집합니다.  속성 패널에 새로운 사용자 정의 속성을 추가하기 위해서 + 버튼에 있는 새로운 섹션 **CustomAttribute** 패널이 있습니다. 

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2024.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2024.png)

    ### Define custom attributes

    1. 마지막 단계에서 작성한 것과 동일한 애니메이션을 포함하는 `xml/step6.xml` 을 엽니다.
    2. 달 색상을 변경 하려면, `CusmtomAttribute`와 함께 두 개의 `KeyAttribute`를 `KeyFrameSet`에 `keyFrame="0"`, `keyFrame="50"`, `keyFrame="100"`을 추가합니다.

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2025.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2025.png)

        **step6.xml**

        ```xml
        <!-- TODO: Add Custom attributes here -->
        <KeyAttribute
               motion:framePosition="0"
               motion:motionTarget="@id/moon">
           <CustomAttribute
                   motion:attributeName="colorFilter"
                   motion:customColorValue="#FFFFFF"
           />
        </KeyAttribute>
        <KeyAttribute
               motion:framePosition="50"
               motion:motionTarget="@id/moon">
           <CustomAttribute
                   motion:attributeName="colorFilter"
                   motion:customColorValue="#FFB612"
           />
        </KeyAttribute>
        <KeyAttribute
               motion:framePosition="100"
               motion:motionTarget="@id/moon">
           <CustomAttribute
                   motion:attributeName="colorFilter"
                   motion:customColorValue="#FFFFFF"
           />
        </KeyAttribute>
        ```

    `KeyAttribute` 내부에 `CustomAttribute` 를 추가합니다. `CustomAttribute` 는 `KeyAttribute` 가 지정한 `framePosition`에 적용됩니다. 

    `CustomAttribute` 안에 `attributeName` 과 value 하나를 설정해야 합니다.

    - `motion:attributeName`은 사용자 정의 속성으로 호출할 setter 의 이름입니다. 이 예에서는 `Drawable` 의 [`setColorFilter`](https://developer.android.com/reference/android/graphics/drawable/Drawable#setColorFilter(android.graphics.ColorFilter)) 를 호출합니다.
    - `motion:custom*Value`는 이름에 명시된 유형의 사용자 정의 값이며, 이 예에서 사용자 정의 값은 지정되어 있습니다.

    사용자 정의 값은 다음 유형 중 하나를 가질 수 있습니다. 

    - Color
    - Integer
    - Float
    - String
    - Dimension
    - Boolean

    이 API를 사용하면 setter 를 제공하는 모든 뷰를 `MotionLayout`에서 애니메이션을 할 수 있습니다. 

    Custim View 는 `CustomAttribute` 를 사용해서 애니메이션 할 수 있습니다. `MotionLayout`이 올바른 타입을 가지는 setter를 찾을 수 있는 한, 값 사이의 변화를 애니메이션 합니다. 

    ### Try it out

    1. 앱을 다시 실행하고 **step 6**로 이동하여 애니메이션이 작동하는지 확인합니다. 

        달을 클릭하면, `KeyFrameSet` 안에 설정된 각각의 `KeyAttribute`를 지나가는 처음부터 끝까지 경로를 따라갑니다. 

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/5fb6792126a09fda%201.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/5fb6792126a09fda%201.gif)

    `KeyFrame` 을 더 추가하면, `MotionLayout`은 달의 경로를 직선에서 복잡한 곡선으로 변경하여 애니메이션을 통해 중간에 double backflip, resize, color change 등을 추가합니다. 

    실제 애니메이션에서는 여러 뷰를 동시에 애니메이션화 하여 다른 경로와 속도를 따라 움직임일 제어하는 경우가 많습니다. 각 뷰에 대해 다른 `KeyFrame` 을 지정 함으로써, `MotionLayout`으로 여러 뷰를 애니매이션화 하는 풍부한 애니메이션을 만들 수 있습니다. 

- 10. Drag events and complex paths

    이 단계에서는 `OnSwipe`를 복잡한 경로와 함께 사용해 볼 수 있습니다. 지금까지 달의 애니메이션은 `OnClick` listener 에 의해 시작되어 일정 시간 동안 실행되어 왔습니다. 

     `OnSwipe`를 사용해서 지난 몇 단계에서 빌드한 달 애니메이션 처럼 복잡한 경로를 가진 애니메이션을 제어 하려면, `OnSwipe` 의 작동 방식을 이해해야 합니다. 

    ### Step 1: Explore OnSwipe behavior

    1. `xml/step7.xml`을 열어서 현재 선언된 `OnSwipe`를 찾습니다. 

        **step7.xml**

        ```xml
        <!-- Fix OnSwipe by changing touchAnchorSide →

        <OnSwipe
               motion:touchAnchorId="@id/moon"
               motion:touchAnchorSide="bottom"
        />
        ```

    2. 앱을 실행 시켜서 **Step7**으로 갑니다. 호(arc)의 경로를 따라서 달을 드래그하여 부드러운 애니메이션을 연출 할 수 있는지 알아봅니다. 

    이 애니메이션을 실행하면 그다지 좋아 보이지 않습니다. 달이 호(arc)의 상단에 도달하면, 달이 점프하는 것처럼 보입니다. 

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/ed96e3674854a548.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/ed96e3674854a548.gif)

    버그를 이해하려면, 사용자가 호(arc)의 상단 바로 아래를 터치할 때 어떤 일이 일어나는 지 고려해야 합니다. `OnSwipe` 태그에 `motion:touchAnchorSide="bottom"`을 가지고 있기 때문에, `MotionLayout`은 애니메이션 내내 손가락과 뷰 하단 사이의 거리를 일정하게 만들어 줄 것입니다. 

    달이 항상 같은 방향으로 움직이는 것이 아니라, 위로 올라갔다가 다시 내려오기 때문에 `MotionLayout`은 사용자가 방금 호(arc)의 상단을 지났을 때 어떻게 해야할 지 모릅니다. 이를 고려 하기 위해, 달의 바닥(bottom) 을 추적하고 있는데, 사용자가 이곳을 터치한다면 어디에 놓아야 할까요?

    ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2026.png](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/Untitled%2026.png)

    ### Step 2: Use the right side

    이런 버그를 피하기 위해서 애니메이션 지속 시간 내내 항상 한 방향으로 진행하는 `touchAnchorId`와 `touchAnchorSide`을 항상 선택하는 것이 중요합니다.

    이 애니메이션에서는 달의 `right`과 `left`가 화면을 가로질러 한 방향으로 진행됩니다. 

    그러나 `bottom`과 `top`이 모두 방향이 바뀝니다. `OnSwipe`가 추적하려고 할 때, 방향이 바뀌게 되면 혼란스러워 질 것입니다.

    Motion Editor 에서 이 단계를 완성하려면, OverView 패널에서 transition을 선택하고 속성 패널에서 `OnSwipe`를 수정합니다. 

    1. 이 애니메이션이 터치 이벤트를 따르게 만드려면, `touchAnchorSide` 를 `right`으로 변경합니다. 

        **step7.xml**

        ```xml
        <!-- Fix OnSwipe by changing touchAnchorSide →

        <OnSwipe
               motion:touchAnchorId="@id/moon"
               motion:touchAnchorSide="right"
        />
        ```

    `OnSwipe`에 전달된 `touchAnchorSide`는 전체 애니메이션 동안 한 방향으로 진행되어야 합니다. anchor 쪽이 경로를 뒤집거나, 잠시 멈추면, `MotionLayout`은 혼란스러워져 부드러운 동작으로 진행되지 않습니다.

    일부 애니메이션에는 적절한 `touchAnchorSide` 가 있는 뷰가 없습니다. 이는 모든 면(side)이 motion을 통해 복잡한 경로를 따라 가거나, 놀라운 애니메이션을 유발하는 방식으로 뷰가 resize 되는 경우 발생할 수 있습니다. 이러한 상황에서는 더 간단한 추적 경로를 따르는 보이지 않는 뷰를 추가하는 것을 고려하는 것이 좋습니다. 

    ### Step 3: Use dragDirection

    `dragDirection`과 `touchAnchorSide`를 결합하여 사이드 트랙을 일반적인 방향과 다른 방향으로 만들 수도 있습니다. `touchAnchorSide`가 한 방향으로만 진행된다는 것은 여전히 중요하지만, `MotionLayout`이 어느 방향으로 추적해야 하는 지 알려줄 수 있습니다. 예를 들어 `touchAnchorSide="bottom"`을 유지하되, `dragDirection="dragRight`"를 추가하면 됩니다. 이로 인해 `MotionLayout`은 뷰의 하단의 위치를 추적하지만, 오른쪽으로 이동할 때의 위치만 고려합니다. (수직 motion은 무시합니다.) 따라서 하단(bottom)이 오르 내리더라도, `OnSwipe`로 정확하게 애니메이션 할 것입니다.

    1. 달의 motion을 올바르게 추적하려면 `OnSwipe`를 업데이트 합니다. 

        **step7.xml**

        ```xml
        <!-- Using dragDirection to control the direction of drag tracking →

        <OnSwipe
               motion:touchAnchorId="@id/moon"
               motion:touchAnchorSide="bottom"
               motion:dragDirection="dragRight"
        />
        ```

    ### Try it out

    1. 앱을 다시 실행하고 달을 전체 경로를 따라 드래그 합니다.

        복잡한 호를 따르더라도 `MotionLayout`은 Swipe 이벤트에 대응해서 애니메이션을 진행할 수 있습니다. 

        ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/5458dff382261427.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/5458dff382261427.gif)

- 11. Running motion with Code

    `MotionLayout`은 `CoordinatorLayout`과 함께 사용하면 풍부한 애니메이션을 만들 수 있습니다. 이 단계에서는 `MotionLayout`을 사용해서 접을 수 있는 헤더를 만듭니다. 

    ### Step 1: Explore the existing code

    1. 시작하기 위해서 `layout/activity_step8.xml` 을 엽니다.
    2. `layout/activity_step8.xml`에서 `CoordinatorLayout`과 `AppbarLayout`이 이미 동작하는 것을 볼 수 있습니다. 

        **activity_step8.xml**

        ```xml
        <androidx.coordinatorlayout.widget.CoordinatorLayout
               ...>
           <com.google.android.material.appbar.AppBarLayout
                   android:id="@+id/appbar_layout"
                   android:layout_width="match_parent"
                   android:layout_height="180dp">
               <androidx.constraintlayout.motion.widget.MotionLayout
                       android:id="@+id/motion_layout"
                       ... >
                   ...
               </androidx.constraintlayout.motion.widget.MotionLayout>
           </com.google.android.material.appbar.AppBarLayout>
          
           <androidx.core.widget.NestedScrollView
                   ...
                   motion:layout_behavior="@string/appbar_scrolling_view_behavior" >
                   ...
           </androidx.core.widget.NestedScrollView>
        </androidx.coordinatorlayout.widget.CoordinatorLayout>
        ```

        이 레이아웃은 `[CoordinatorLayout](https://developer.android.com/reference/kotlin/androidx/coordinatorlayout/widget/CoordinatorLayout)`을 사용해서 `NestedScrollView` 와 `AppbarLayout` 간에 스크롤 정보를 공유합니다. 따라서 `NestedScrollView` 가 위로 스크롤 되면, `AppbarLayout`에 변경된 사항을 알려줍니다. 안드로이드에 이렇게 접히는 toolbar 를 구현해서 넣을 수 있습니다. 텍스트 스크롤은 접히는 헤더와 "coordinated" 됩니다.

        `@id/motion_layout`이 가리키는 motion scene은 마지막 단계의 motion scene과 유사합니다. 그러나 `OnSwipe` 선언은 `CoordinatorLayout`과 함께 작동할 수 있도록 삭제 되었습니다.

    3. 앱을 다시 실행시키고 **Step8**로 갑니다. 텍스트가 스크롤 될 때, 달이 움직이지 않는 것을 볼 수 있습니다.

    ### Step 2: Make the MotionLayout scroll

    1. NestedScrollView가 스크롤 되는 즉시 MotionLayout 뷰가 스크롤 되게 하려면, MotionLayout에 `android:minHeight` 및 `app:layout_scrollFlag`를 추가합니다. 

        **activity_step8.xml**

        ```xml
        <!-- Add minHeight and layout_scrollFlags to the MotionLayout -->

        <androidx.constraintlayout.motion.widget.MotionLayout
               android:id="@+id/motion_layout"
               android:layout_width="match_parent"
               android:layout_height="match_parent"
               app:layoutDescription="@xml/step8"
               app:motionDebug="SHOW_PATH"
               android:minHeight="80dp"
               app:layout_scrollFlags="scroll|enterAlways|snap|exitUntilCollapsed"  >

        ```

    2. 앱을 다시 실행 시키고 **step 8**로 갑니다.

        위로 스크롤 하면 `MotionLayout` 이 줄어드는 것을 볼 수 있습니다. 그러나 애니메이션은 아직 스크롤 동작을 기반으로 진행되지 않습니다. 

    ### Step 3: Move the motion with code

    1. `Step8Activity.kt`를 엽니다. `coordinateMotion()` function을 편집해서 `MotionLayout`에 스크롤 위치의 변경 사항을 알려 줍니다. 

        **Step8Activity.kt**

        ```kotlin
        // TODO: set progress of MotionLayout based on an AppBarLayout.OnOffsetChangedListener

        private fun coordinateMotion() {
            val appBarLayout: AppBarLayout = findViewById(R.id.appbar_layout)
            val motionLayout: MotionLayout = findViewById(R.id.motion_layout)

            val listener = AppBarLayout.OnOffsetChangedListener { unused, verticalOffset ->
                val seekPosition = -verticalOffset / appBarLayout.totalScrollRange.toFloat()
                motionLayout.progress = seekPosition
            }

            appBarLayout.addOnOffsetChangedListener(listener)
        }
        ```

        이 코드는 사용자가 스크롤 할 때마다 현재의 scroll offset을 반환 해주는 `OnOffsetChangedLister` 를 등록합니다. 

        `MotionLayout`은 progress를 설정하여 transition을 찾는 것을 지원합니다. `verticalOffset`과 진행률(percentage progress) 간에 바꾸려면, 전체 스크롤 범위로 나눠 줍니다. 

        `MotionLayout`은 코드에서 애니메이션의 특정 지점을 찾을 수 있습니다. `motionLayout.progress` 를 설정하여 이 작업을 수행합니다. `MotionLayout`은 즉시 지정된 위치로 "점프"합니다. 그래서 예를 들어 진행률을 0.43으로 설정하면 `MotionLayout`은 애니메이션의 43% 위치로 점프합니다.

        ### Try it out

        1. 앱을 다시 실행하고, **step 8**의 애니메이션을 실행합니다. `MotionLayout`이 스크롤 위치를 기준으로 애니메이션을 진행하는 것을 알 수 있습니다. 

            ![Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/ee5ce4d9e33a59ca.gif](Animation%20with%20MotionLayout%2048f272a1209145c2916778fa6068e513/ee5ce4d9e33a59ca.gif)

        `MotionLayout`을 사용하여 사용자 지정 동적으로 접히는 toolbar 애니메이션을 만들 수 있습니다. `KeyFrame` 의 sequence 를 사용하며 매우 과감한 ( very bold ) 효과를 얻을 수 있습니다. 

        `AppBarLayout`은 `MotionLayout`의 크기를 조정하지 않습니다. 

        `AppBarLayout`이 뷰를 접으면 `MotionLayout` View는 부분적으로 화면 밖으로 이동합니다. 사이즈는 조정되지 않고, 단지 위로 움직입니다. `MotionLayout` 상단에 constraint가 있는 경우 애니메이션이 끝날 때 화면이 꺼집니다. `AppBarLayout`과 함께 작업하기 위해서, end constriant가 parent 의 하단(bottom)에 고정되도록 합니다. 

- 12. Congratulations

    이 코드랩은 `MotionLayout`의 기본 API 를 다루었습니다. 

    실제 더 많은 `MotionLayout`의 예제를 보려면 공식 [샘플](https://github.com/googlesamples/android-ConstraintLayoutExamples)을 확인하십시오. 그리고 [문서](https://developer.android.com/training/constraint-layout/motion-layout)도 꼭 확인해 주세요!

    ### Learn More

    `MotionLayout`은 코드랩에서 다룬 것 보다 훨씬 더 많은 기능을 지원합니다- 반복적인 경로나 속성을 제어할 수 있는 `KeyCycle`와 clock time 을 기준으로 애니메이션 할 수 있는 `KeyTimeCycle`. 각 샘플의 예제를 확인하십시오.

    이 과정의 다른 코드랩의 링크는 [Advanced Android in Kotlin codelabs](https://codelabs.developers.google.com/advanced-android-kotlin-training/) 페이지를 참조하세요.  

    ### QnA

    step3 달 움직이는 모션 레이아웃에서 움직이던 도중 달을 클릭하면 모션이 중단되고 다시 처음부터 시작 되던데 모션이 움직이는 도중에는 이벤트가 적용되지 않게 하는 방법이 있을까요?
    어떠한 앱이 켜질 때 로딩화면에서 모션 레이아웃을 적용한다고 하였을 때 클릭 한다고 모션 레이아웃이 취소되지 않게요.

    MotionLayout 에서는 `isInteractionEnabled = Boolean` 값으로 interaction을 조절할 수 있습니다. `MotionLayout.class` 코드를 참조 해보면, 기본 값은 `true` 인데, 전체 클래스에 걸쳐서 click, touch 이벤트 관련 메서드에서 이 Flag의 `boolean` 값을 참조하는 것을 알 수 있습니다. 

    ```java
    //MotionLayout.class

    private boolean mInteractionEnabled = true;

    public void setInteractionEnabled(boolean enabled) {
            this.mInteractionEnabled = enabled;
        }

        public boolean isInteractionEnabled() {
            return this.mInteractionEnabled;
        }
    ```

    원하는 동작은 모션 애니메이션 동작 중간에 다시 한 번 click으로 애니메이션이 다시 시작하는 것을 막는 것이므로, `Step3activity.kt`코드에서  `setTransitionListener` 를 등록해서, `MotionLayout`의 `Transtion` 이 시작한 이후에 `onTransitionStarted`에서 `motionLayout.isInteractionEnabled = false` 로 interaction 을 막아 줍니다. 

    또 모션 애니메이션이 완료된 이후에 `onTransitionCompleted`가 호출 되면, 다시 `transition` 의 `clickAction="toggle"` 이 필요하므로, (`xml/step3.xml` 참조) 다시 `motionLayout?.isInteractionEnabled = true` 로 열어 주면 됩니다. 

    ```kotlin
    //Step3Activity.kt

    val motionLayout: MotionLayout = findViewById(R.id.motion_layout)

    motionLayout.setTransitionListener(object : MotionLayout.TransitionListener {
        override fun onTransitionCompleted(motionLayout: MotionLayout?, currentId: Int) {
            motionLayout?.isInteractionEnabled = true
        }

        override fun onTransitionTrigger(p0: MotionLayout?, p1: Int, p2: Boolean, p3: Float) {
        }

        override fun onTransitionStarted(p0: MotionLayout?, p1: Int, p2: Int) {
            motionLayout.isInteractionEnabled = false
        }

        override fun onTransitionChange(motionLayout: MotionLayout?, startId: Int, endId: Int, progress: Float) {
        }
    })
    ```

    저희와 함께 DevFest 2020 Android CodeLab에 끝까지 참여해주셔서 감사합니다. :)
    저희도 처음 진행하는 온라인 CodeLab이다 보니, 여러모로 아쉬운 점도 많았는데요,
    CodeLab에 참여해주신 참석자분들의 의견을 받아 실제로 참석자분들에게 행사가 도움이 되었는지, 그리고 다음 이벤트에 개선점을 반영하기 위해 참석자분들의 의견을 확인하고자 합니다.

    행사에 적극적으로 참여하신분들과 설문에 좋은 의견 주신분들, 그리고 추첨을 통해 Google 제공하는 굿즈를 선물로 보내드릴 예정입니다. **안드로이드 피규어(!!)**, DevFest2020 티셔츠, 안드로이드 뱃지 등이 준비되어 있으니 좋은 의견 많이 부탁드립니다!!

    설문수집 기간 : 2020-10-18 23:59까지

    다시 한 번 참여해주셔서 감사하며, 소중한 의견 감사합니다.

    [Android CodeLab(DevFest2020) 참가자 설문조사](https://forms.gle/rUYgHdPPyGcSkctz6)
